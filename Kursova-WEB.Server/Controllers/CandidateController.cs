using Kursova_WEB.Server.Models;
using Kursova_WEB.Server.Models.Requests;
using Kursova_WEB.Server.Models.Responsed;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text.RegularExpressions;

namespace Kursova_WEB.Server.Controllers
{
    [Authorize]
    [Route("api/v1/candidate")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private readonly SiteContext _siteContext;
        public CandidateController(SiteContext siteContext)
        {
            _siteContext = siteContext;
        }

        [HttpGet]
        [Route("list/{surveyId}")]
        public async Task<ApiResponse<Survey>> List(int surveyId)
        {
            return ApiResponse<Survey>
            .SuccessResponse(await _siteContext.Surveys.
                Include(x => x.Candidates).
                FirstAsync(x => x.Id == surveyId));
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ApiResponse<Candidate>> GetById(int id)
        {
            return ApiResponse<Candidate>
            .SuccessResponse(await _siteContext.Candidates.FirstAsync(x => x.Id == id));
        }

        [HttpPost]
        [Route("create/{surveyId}")]
        public async Task<ApiResponse<Candidate>> Create([FromBody] CandidateRequest request, int surveyId)
        {
            var surveys = await _siteContext.Surveys.FirstAsync(x => x.Id == surveyId);

            var model = new Candidate();

            model.Name = request.Name;
            model.Votes = 0;

            surveys.Candidates.Add(model);

            await _siteContext.SaveChangesAsync();


            return ApiResponse<Candidate>
            .SuccessResponse(model);
        }

        [HttpPost]
        [Route("edit/{id}")]
        public async Task<ApiResponse<Candidate>> Edit([FromBody] CandidateRequest request, int id)
        {
            var model = await _siteContext.Candidates.FirstAsync(x => x.Id == id);

            model.Name = request.Name;

            await _siteContext.SaveChangesAsync();


            return ApiResponse<Candidate>
            .SuccessResponse(model);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<ApiResponse<Candidate>> Delete(int id)
        {
            var model = await _siteContext.Candidates.FirstAsync(x => x.Id == id);


            _siteContext.Remove(model);

            await _siteContext.SaveChangesAsync();

            return ApiResponse<Candidate>
            .SuccessResponse(model);
        }
    }
}
