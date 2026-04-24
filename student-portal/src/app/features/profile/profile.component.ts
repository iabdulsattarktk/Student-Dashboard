import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../core/course.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  username = '';
  enrolledCourses: any[] = [];

  constructor(private authService: AuthService, private courseService: CourseService) {}

  ngOnInit() {
    this.username = this.authService.getUsername();
    this.courseService.courses$.subscribe(data => {
      this.enrolledCourses = data.filter(c => c.enrolled);
    });
  }
}
