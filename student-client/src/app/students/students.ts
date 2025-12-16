import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentsService } from '../services/students';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class Students implements OnInit {

  students: any[] = [];

  student = {
    id: 0,
    name: '',
    class: '',
    section: ''
  };

  isEdit = false;

  constructor(
    readonly studentsService: StudentsService,
    readonly cdr: ChangeDetectorRef   // 🔥 ADD THIS
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentsService.getStudents().subscribe({
      next: (res) => {
        this.students = res;

        // 🔥 FORCE UI UPDATE ON FIRST LOAD
        this.cdr.detectChanges();
      }
    });
  }

  addStudent() {
    this.studentsService.addStudent(this.student).subscribe(() => {
      this.resetForm();
      this.loadStudents();
    });
  }

  editStudent(s: any) {
    this.student = { ...s };
    this.isEdit = true;
  }

  updateStudent() {
    this.studentsService.updateStudent(this.student.id, this.student)
      .subscribe(() => {
        this.resetForm();
        this.loadStudents();
      });
  }

  deleteStudent(id: number) {
    this.studentsService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }

  resetForm() {
    this.student = { id: 0, name: '', class: '', section: '' };
    this.isEdit = false;
  }
}
