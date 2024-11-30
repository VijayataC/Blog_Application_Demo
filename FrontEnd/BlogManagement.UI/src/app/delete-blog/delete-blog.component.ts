import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BlogServiceService } from '../Services/blog-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-blog.component.html',
  styleUrl: './delete-blog.component.scss'
})
export class DeleteBlogComponent {
  @Input() blog: any = null; // Blog data to display
  @Input() showModal: boolean = false; // Modal visibility
  @Output() confirmDelete = new EventEmitter<number>();
  @Output() cancelDelete = new EventEmitter<void>();

  constructor(private blogService: BlogServiceService){

  }
  onConfirm(): void {
    if (this.blog) {
      this.blogService.deleteBlog(this.blog.id).subscribe(response => {
        this.confirmDelete.emit(); // Emit blog ID for deletion
      });
     
    }
  }

  onCancel(): void {
    this.cancelDelete.emit(); // Emit cancel event
  }
}
