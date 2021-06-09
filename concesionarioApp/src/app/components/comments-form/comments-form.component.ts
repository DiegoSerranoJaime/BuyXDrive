import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsService } from 'src/app/services/comments.service';
import { ToastService } from 'src/app/services/toast.service';
import { CommentSend } from 'src/models/comments.model';

@Component({
  selector: 'app-comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.scss']
})
export class CommentsFormComponent implements OnInit, OnChanges {

  @Input() product_id: number;

  @Output() add = new EventEmitter<void>();

  public exist: boolean;

  public myForm: FormGroup;
  public title: FormControl;
  public body: FormControl;
  public valoration: FormControl;

  constructor(public _authService: AuthService,
    private _commentsService: CommentsService,
    private _toastService: ToastService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.checkCommentExist();
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.title = new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]);
    this.body = new FormControl('', [Validators.required, Validators.maxLength(255), Validators.minLength(10)]);
    this.valoration = new FormControl(0, [Validators.required, Validators.max(5), Validators.min(0)]);
  }

  createForm() {
    this.myForm = new FormGroup({
      title: this.title,
      body: this.body,
      valoration: this.valoration
    });
  }

  checkCommentExist() {
    if (this._authService.isAuthenticated()) {
      this._commentsService.commentAlreadyExistValidation(this.product_id).subscribe((data) => {
        this.exist = data.ok;
      });
    }
  }

  submit() {
    if (this.myForm.valid) {
      let comment: CommentSend = {
        ...this.myForm.value,
        product_id: Number(this.product_id)
      };

      this._commentsService.insertCommentOfAProduct(comment).subscribe((data) => {
        this._toastService.show(data.msg);
        this.myForm.reset();
        this.exist = true;
        this.add.emit();
      }, (err) => {
        this._toastService.show('No se ha podido agregar el comentario');
      });
    }

    this.myForm.markAllAsTouched();
  }
}
