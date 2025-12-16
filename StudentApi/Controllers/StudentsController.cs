using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentApi.Data;
using StudentApi.Models;
using StudentApi.DTOs;
using Microsoft.AspNetCore.Authorization;


namespace StudentApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly StudentDbContext _context;
        public StudentsController(StudentDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetStudents()
        {
            var students = await _context.Students
                .Select(s => new StudentDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    Class = s.Class,
                    Section = s.Section
                })
                .ToListAsync();
            return Ok(students);
        }

        [HttpPost]
        public async Task<IActionResult> AddStudent(CreateStudentDto dto)
        {
            var student= new Student
            {
                Name = dto.Name,
                Class = dto.Class,
                Section = dto.Section
            };

            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            var response = new StudentDto
            {
                Id = student.Id,
                Name = student.Name,
                Class = student.Class,
                Section = student.Section
            };

            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, UpdateStudentDto dto)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
                return NotFound();
            student.Name = dto.Name;
            student.Class = dto.Class;
            student.Section = dto.Section;

            await _context.SaveChangesAsync();
            var response = new StudentDto
            {
                Id = student.Id,
                Name = student.Name,
                Class = student.Class,
                Section = student.Section
            };

            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
                return NotFound();
            _context.Students.Remove(student);
            await _context.SaveChangesAsync();
            return Ok();
        }

    }
}
