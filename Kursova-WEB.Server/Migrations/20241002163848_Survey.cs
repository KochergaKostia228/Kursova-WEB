using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Kursova_WEB.Server.Migrations
{
    /// <inheritdoc />
    public partial class Survey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isActive",
                table: "Surveys",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isActive",
                table: "Surveys");
        }
    }
}
