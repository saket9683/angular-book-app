import { Component, OnInit } from '@angular/core';

import { Course } from '../course';
import { CourseService } from '../course.service';
import { count } from 'rxjs/operators/count';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

 // selectedCourse: Course;

  courses: Course[];

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.getCourses();
  }
/*
  onSelect(course: Course): void {
    this.selectedCourse = course;
  }
*/
  getCourses(): void {
    this.courseService.getCourses()
        .subscribe(courses => this.courses = courses);
  }
  
  add(name: string): void {
    name = name.trim();
    if(!name) {return; }
    this.courseService.addCourse({ name} as Course)
    .subscribe(Course => {
      this.courses.push(Course);
    })
  }

  delete(course: Course){
    this.courses = this.courses.filter(h => h !=course);
    this.courseService.deleteCourse(course).subscribe();
  }

  
}