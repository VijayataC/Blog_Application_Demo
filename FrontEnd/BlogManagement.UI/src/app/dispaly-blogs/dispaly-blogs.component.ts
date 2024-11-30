import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlogServiceService } from '../Services/blog-service.service';
import { FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dispaly-blogs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dispaly-blogs.component.html',
  styleUrl: './dispaly-blogs.component.scss'
})
export class DispalyBlogsComponent implements OnInit {

  constructor(private blogService: BlogServiceService,
    private fb: FormBuilder
  ) {

  }

  @Input() blogs: any[] = [];
  @Output() editBlog = new EventEmitter<any>();
  @Output() deleteBlog = new EventEmitter<number>();

  ngOnInit(): void {

    this.getBlogList();
  }

  getBlogList() {
    this.blogService.getBlogList().subscribe(response => {
      this.blogs = response;
    });
  }

  onEdit(blog: any): void {
    this.editBlog.emit(blog);
  }

  onDelete(blog:any): void {
    this.deleteBlog.emit(blog);
  }
}
