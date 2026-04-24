import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../core/course.service';
import { FilterPipe } from '../../shared/filter.pipe';
import { SortPipe } from '../../shared/sort.pipe';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];
  searchText = '';
  sortField = 'name';
  sortOrder = 'asc';

  showAddForm = false;
  newCourseName = '';
  newCourseCategory = '';

  pageSize = 3;
  currentPage = 1;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courseService.courses$.subscribe(data => {
      this.courses = data;
    });
  }

  enroll(course: any) {
    this.courseService.enroll(course.id);
  }

  deleteCourse(course: any) {
    if (confirm('Delete "' + course.name + '"?')) {
      this.courseService.deleteCourse(course.id);
      if (this.currentPage > this.totalPages && this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }

  showAll() {
    this.searchText = '';
    this.currentPage = 1;
  }

  addCourse() {
    if (!this.newCourseName.trim() || !this.newCourseCategory.trim()) {
      alert('Please fill in course name and category.');
      return;
    }
    this.courseService.addCourse(this.newCourseName.trim(), this.newCourseCategory.trim());
    this.newCourseName = '';
    this.newCourseCategory = '';
    this.showAddForm = false;
  }

  get filteredCourses() {
    const filterPipe = new FilterPipe();
    const sortPipe = new SortPipe();
    const filtered = filterPipe.transform(this.courses, this.searchText);
    return sortPipe.transform(filtered, this.sortField, this.sortOrder);
  }

  get totalPages() {
    return Math.ceil(this.filteredCourses.length / this.pageSize);
  }

  get paginatedCourses() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredCourses.slice(start, start + this.pageSize);
  }

  get pages() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  onSearchChange() {
    this.currentPage = 1;
  }
}
