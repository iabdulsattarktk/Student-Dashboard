import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private defaultCourses = [
    { id: 1, name: 'Angular Basics', category: 'Frontend', progress: 30, enrolled: false },
    { id: 2, name: 'TypeScript Mastery', category: 'Language', progress: 70, enrolled: true },
    { id: 3, name: 'Web Development', category: 'General', progress: 50, enrolled: true },
    { id: 4, name: 'React Fundamentals', category: 'Frontend', progress: 20, enrolled: false },
    { id: 5, name: 'Node.js Basics', category: 'Backend', progress: 60, enrolled: false },
    { id: 6, name: 'CSS and Design', category: 'Frontend', progress: 40, enrolled: false },
    { id: 7, name: 'Database Management', category: 'Backend', progress: 10, enrolled: false },
  ];

  private coursesSubject = new BehaviorSubject<any[]>(this.loadFromStorage());
  courses$ = this.coursesSubject.asObservable();

  private loadFromStorage(): any[] {
    const saved = localStorage.getItem('courses');
    if (saved) {
      return JSON.parse(saved);
    }
    return this.defaultCourses;
  }

  private saveToStorage(courses: any[]) {
    localStorage.setItem('courses', JSON.stringify(courses));
  }

  getCourses(): any[] {
    return this.coursesSubject.getValue();
  }

  addCourse(name: string, category: string) {
    const courses = this.getCourses();
    const newCourse = {
      id: Date.now(),
      name,
      category,
      progress: 0,
      enrolled: false
    };
    const updated = [...courses, newCourse];
    this.coursesSubject.next(updated);
    this.saveToStorage(updated);
  }

  enroll(courseId: number) {
    const courses = this.getCourses().map(c => {
      if (c.id === courseId) {
        return { ...c, enrolled: true };
      }
      return c;
    });
    this.coursesSubject.next(courses);
    this.saveToStorage(courses);
  }

  deleteCourse(courseId: number) {
    const updated = this.getCourses().filter(c => c.id !== courseId);
    this.coursesSubject.next(updated);
    this.saveToStorage(updated);
  }
}
