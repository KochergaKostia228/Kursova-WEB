using Kursova_WEB.Server.Models;
using Kursova_WEB.Server.Models.Requests;
using Kursova_WEB.Server.Models.Responsed;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using System.Text.RegularExpressions;

namespace Kursova_WEB.Server.Controllers
{
    [Authorize]
    [Route("api/v1/survey")]
    [ApiController]
    public class SurveyController : ControllerBase
    {
        private readonly SiteContext _siteContext;
        private readonly UserManager<User> _userManager;
        public SurveyController(SiteContext siteContext, UserManager<User> userManager)
        {
            _siteContext = siteContext;
            _userManager = userManager;
        }

        public async Task UpdatePollStatuses()
        {

            var currentTime = DateTime.UtcNow;

            var offset = TimeSpan.FromHours(3);

            // Преобразуем UTC время в нужный часовой пояс
            var timeZoneTime = currentTime.Add(offset);

            var polls = await _siteContext.Surveys.ToListAsync();

            foreach (var poll in polls)
            {
                if (poll.EndDate < timeZoneTime)
                {
                    poll.Status = SurveyStatus.Overdue; // Устанавливаем статус
                }
            }

            await _siteContext.SaveChangesAsync();
        }

        [HttpGet]
        [Route("noActiveList")]
        public async Task<ApiResponse<IEnumerable<Survey>>> NoActiveList()
        {
            await UpdatePollStatuses(); // Обновляем статусы перед возвратом данных

            
            return ApiResponse<IEnumerable<Survey>>
            .SuccessResponse(await _siteContext.Surveys.Include(x => x.Candidates).Where(x => x.Status == SurveyStatus.NoActivate).ToListAsync());
        }

        [HttpGet]
        [Route("activeList")]
        public async Task<ApiResponse<IEnumerable<Survey>>> ActiveList()
        {
            await UpdatePollStatuses(); // Обновляем статусы перед возвратом данных

            var model = await _siteContext.Surveys.Include(x => x.Candidates).Where(x => x.Status == SurveyStatus.Activate).ToListAsync();
            var userEmail = User.Claims.First(x => x.Type == ClaimTypes.Email).Value;

            var user = await _userManager.FindByEmailAsync(userEmail);

            var surveys = new List<Survey>();

            foreach (var survey in model)
            {
                if (!await _siteContext.Votes.AnyAsync(v => v.User.Id == user.Id && v.Survey.Id == survey.Id))
                {
                    surveys.Add(survey);
                }
            }

            return ApiResponse<IEnumerable<Survey>>
            .SuccessResponse(surveys);
        }

        [HttpGet]
        [Route("resultList")]
        public async Task<ApiResponse<IEnumerable<Survey>>> ResultList()
        {
            await UpdatePollStatuses(); // Обновляем статусы перед возвратом данных

            var model = await _siteContext.Surveys.
                Include(x => x.Candidates).
                Where(x => x.Status == SurveyStatus.Activate || x.Status == SurveyStatus.Overdue).
                ToListAsync();

            var userEmail = User.Claims.First(x => x.Type == ClaimTypes.Email).Value;

            var user = await _userManager.FindByEmailAsync(userEmail);

            var surveys = new List<Survey>();

            foreach (var survey in model)
            {
                if (await _siteContext.Votes.AnyAsync(v => v.User.Id == user.Id && v.Survey.Id == survey.Id))
                {
                    survey.Status = SurveyStatus.Complete;
                }
                surveys.Add(survey);
            }

            return ApiResponse<IEnumerable<Survey>>
            .SuccessResponse(surveys);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ApiResponse<Survey>> GetById(int id)
        {
            return ApiResponse<Survey>
            .SuccessResponse(await _siteContext.Surveys.Include(x => x.Candidates).FirstAsync(x => x.Id == id));
        }

        [HttpPost]
        [Route("create")]
        public async Task<ApiResponse<Survey>> Create([FromBody] SurveyRequest request)
        {
            var model = new Survey();

            model.Name = request.Name;
            model.Description = request.Description;
            model.StartDate = request.StartDate;
            model.EndDate = request.EndDate;
            model.Candidates = request.Candidates;

            _siteContext.Surveys.Add(model);

            await _siteContext.SaveChangesAsync();


            return ApiResponse<Survey>
            .SuccessResponse(model);
        }

        [HttpPost]
        [Route("edit/{id}")]
        public async Task<ApiResponse<Survey>> Edit([FromBody] SurveyRequest request, int id)
        {
            var model = await _siteContext.Surveys.Include(x => x.Candidates).FirstAsync(x => x.Id == id);

            model.Name = request.Name;
            model.Description = request.Description;
            model.StartDate = request.StartDate;
            model.EndDate = request.EndDate;

            await _siteContext.SaveChangesAsync();


            return ApiResponse<Survey>
            .SuccessResponse(model);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<ApiResponse<Survey>> Delete(int id)
        {
            var model = await _siteContext.Surveys.Include(x => x.Candidates).FirstAsync(x => x.Id == id);

            if(model.Candidates != null)
            {
                foreach (var candidate in model.Candidates)
                {
                    _siteContext.Candidates.Remove(candidate);
                }
            }

            _siteContext.Remove(model);

            await _siteContext.SaveChangesAsync();

            return ApiResponse<Survey>
            .SuccessResponse(model);
        }

        [HttpGet]
        [Route("activate/{id}")]
        public async Task<ApiResponse<Survey>> Activate(int id)
        {
            var model = await _siteContext.Surveys.Include(x => x.Candidates).FirstAsync(x => x.Id == id);

            model.Status = SurveyStatus.Activate;

            await _siteContext.SaveChangesAsync();

            return ApiResponse<Survey>
            .SuccessResponse(model);
        }

        [HttpPost]
        [Route("vote/{id}")]
        public async Task<ApiResponse<Vote>> Vote(int id, [FromBody] CandidateRequest request)
        {
            var model = await _siteContext.Surveys.
                Include(x => x.Candidates).
                FirstAsync(x => x.Id == id);

            var userEmail = User.Claims.First(x => x.Type == ClaimTypes.Email).Value;

            var candidate = await _siteContext.Candidates.FirstAsync(x => x.Id == request.Id);

            var vote = new Vote();

            vote.User = await _userManager.FindByEmailAsync(userEmail);
            vote.Candidate = candidate;
            vote.Survey = model;

            if (!await _siteContext.Votes.AnyAsync(v => v.User.Id == vote.User.Id && v.Survey.Id == model.Id)) {
                vote.Candidate.Votes += 1;
                _siteContext.Votes.Add(vote);
            }

            await _siteContext.SaveChangesAsync();

            return ApiResponse<Vote>
            .SuccessResponse(vote);
        }
    }
}
