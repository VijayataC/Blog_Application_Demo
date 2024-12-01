import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogServiceService } from '../Services/blog-service.service';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;


@Component({
  selector: 'app-add-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-update.component.html',
  styleUrl: './add-update.component.scss'
})
export class AddUpdateComponent implements AfterViewInit {
  @ViewChild('formModal') formModal!: ElementRef;
  @Input() blog: any; // Input for editing an existing blog
  @Input() edit: any;
  @Output() blogSaved = new EventEmitter<any>(); // Emits when a blog is added/updated

  blogForm: FormGroup;
  showSuccessModal: boolean = false;
  successMessage: string = "";
  private modalInstance: any;

  constructor(private blogService: BlogServiceService,
    private fb: FormBuilder) {
    this.blogForm = this.fb.group({
      id: [null],
      username: ['', Validators.required],
      text: ['', Validators.required],
      dateCreated: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    // Initialize modal after view loads
    this.modalInstance = new bootstrap.Modal(this.formModal.nativeElement, {});
  }

  ngOnChanges(): void {
    if (this.blog) {
      this.blogForm.patchValue(this.blog);
      const formattedDate = this.blog.dateCreated.split('T')[0];
      this.blogForm.get('dateCreated')?.setValue(formattedDate);
      this.openForm();
    }
  }




  onSubmit(): void {
    if (this.blogForm.valid) {
      if (!this.edit) {
        this.blogService.createBlog(this.blogForm.value).subscribe(response => {
         
          this.showSuccessModal = true;
          this.successMessage = "Blog Created Successfully";
          // Close the modal after 3 seconds
          setTimeout(() => {
            this.closeSuccessModal();
          }, 3000);
          this.blogSaved.emit();

        })
      }
      else {
        this.blogService.updateBlog(this.blogForm.value).subscribe(response => {
          
          this.showSuccessModal = true;
          this.successMessage = "Blog Updated Successfully";
          // Close the modal after 3 seconds
          setTimeout(() => {
            this.closeSuccessModal();
          }, 3000);
          this.blogSaved.emit();
        })
      }
    }

    this.modalInstance.hide();
    // Optionally, reset the form
    this.blogForm.reset();

  }



  openForm() {
    if (!this.edit) {
      this.blogForm.reset();
    }
   
    this.modalInstance.show();
  }
  closeSuccessModal(): void {
    this.showSuccessModal = false; // Hide the modal
    this.successMessage = ''; // Clear the message
  }

  onModalCloseButton()
  {
    this.blogForm.reset();
  }
}
