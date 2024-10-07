using Kursova_WEB.Server.Models;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Kursova_WEB.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddSurveyStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isActive",
                table: "Surveys",
                newName: "Status");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Surveys",
                newName: "isActive");
        }
    }
}
