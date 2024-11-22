import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlogServiceService } from './Services/blog-service.service';
import { CommonModule } from '@angular/common';
import { BlogModel } from './Models/BlogModel';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { response } from 'express';
// import bootstrap from '../main.server';
import { bootstrapApplication } from '@angular/platform-browser';
// import bootstrap from '../main.server';
declare var bootstrap: any;


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  blogList: BlogModel[] = [];
  blogForm: FormGroup;
  editMode: boolean = false;


  constructor(private blogService: BlogServiceService,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {

    this.getBlogList();

    this.blogForm = this.fb.group({
      id: [],
      userName: ['', [Validators.required]],
      text: ['', Validators.required],
      dateCreated: [null, Validators.required],
    });

    // if (this.editMode && this.formData) {
    //   this.blogForm.patchValue(this.formData);
    // }
  }

  getBlogList() {
    this.blogService.getBlogList().subscribe(response => {


      this.blogList = response;
    });
  }
  onBlogDelete(id: number) {
    this.blogService.deleteBlog(id).subscribe(response => {
      this.getBlogList();
    });
  }

  confirmDelete() {

  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      console.log('Form Data:', this.blogForm.value);
      if(this.editMode)
      {
        this.updateBlog();
      }
      else{
        this.saveBlog();
      }
      
      const closeBtn = document.getElementById('closeModalButton') as HTMLElement;
      closeBtn.click();
    } else {
      alert("Form data is not valid");
    }
  }

  saveBlog()
  {
    this.blogService.createBlog(this.blogForm.value).subscribe(response=>{
      alert('Blog Created');
      this.getBlogList();
    })
  }

  onNewButtonClicked()
  {
    this.editMode = false;
    this.blogForm.reset();
  }
  updateBlog()
  {
    this.blogService.updateBlog(this.blogForm.value).subscribe(response=>{
      alert('Blog Updated');
      this.getBlogList();
    })
  }
  onBlogUpdate(blog)
  {
    this.editMode = true;
    // this.selectedFormData = blog;
    let body ={
      id : blog.id,
      userName : blog.userName,
      text : blog.text,
      dateCreated : blog.dateCreated
    }
    // this.blogForm.patchValue(blog);
    this.blogForm.get('id').setValue(blog.id);
    this.blogForm.get('userName').setValue(blog.username);
    this.blogForm.get('text').setValue(blog.text);
    const formattedDate = new Date(blog.dateCreated).toISOString().split('T')[0];
    this.blogForm.get('dateCreated')?.setValue(formattedDate);
    const modal = document.getElementById('formModal');
    if (modal) {
       const bootstrapModal = new bootstrap.Modal(modal)
      //  modal.classList.add('show');
       bootstrapModal.show();
      
    }
  }
}
