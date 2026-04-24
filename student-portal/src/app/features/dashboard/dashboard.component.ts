import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../core/course.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  courses: any[] = [];
  totalCourses = 0;
  enrolledCount = 0;
  avgProgress = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courseService.courses$.subscribe(data => {
      this.courses = data;
      this.totalCourses = data.length;
      this.enrolledCount = data.filter(c => c.enrolled).length;
      const total = data.reduce((sum: number, c: any) => sum + c.progress, 0);
      this.avgProgress = data.length ? Math.round(total / data.length) : 0;
    });
  }
}
