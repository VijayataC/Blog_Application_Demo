import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlogServiceService } from './Services/blog-service.service';
import { BlogModel } from './Models/BlogModel';
import { FormGroup } from '@angular/forms';
import { DispalyBlogsComponent } from './dispaly-blogs/dispaly-blogs.component';
import { AddUpdateComponent } from './add-update/add-update.component';
import { DeleteBlogComponent } from './delete-blog/delete-blog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DispalyBlogsComponent, AddUpdateComponent, DeleteBlogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  blogList: BlogModel[] = [];
  blogForm: FormGroup;
  editMode: boolean = false;
  selectedBlog: any = null;
  blogToDelete: any = null;
  showDeleteModal: boolean = false; // Modal visibility flag
  @ViewChild(AddUpdateComponent) addUpdateComponent!: AddUpdateComponent;
  constructor(private blogService: BlogServiceService,
  ) {

  }

  ngOnInit(): void {
    //Initial blog list
    this.getBlogList();
  }

  getBlogList() {
    this.blogService.getBlogList().subscribe(response => {
      this.blogList = response;
    });
  }

 //create new blog
  onNewButtonClicked() {
    this.editMode = false;//set edit mode to false
    this.selectedBlog = null; //no blog is selected
    this.addUpdateComponent.openForm();
  }

 //on edit click update selected blog
  editBlog(blog: any): void {
    this.selectedBlog = { ...blog };
    this.editMode = true; //set edit mode to true
  }

  //on delete click update selected blog
  deleteBlog(blog: any): void {
    this.blogToDelete = { ...blog };
    this.showDeleteModal = true;
  }

  // after delete blog update blog list and close delete modal
  afterdeleteBlog() {
    this.getBlogList();
    this.closeDeleteModal();
  }

  addOrUpdateBlog(): void {
    this.getBlogList();
    this.selectedBlog = null;
    this.editMode = false;
  }

  closeDeleteModal(): void {
    this.blogToDelete = null; // Reset blog data
    this.showDeleteModal = false; // Hide the modal
  }
}
