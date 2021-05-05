import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Heading } from 'src/app/model/forum/heading';
import { Post } from 'src/app/model/forum/post';
import { ForumHelperService } from 'src/app/services/forum/forum-helper.service';
import { PostService } from 'src/app/services/forum/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  heading : any = {} as Heading;

  post : any = {} as Post;
  titleValidator : boolean = true;
  
  constructor(private postService : PostService ,private toastr: ToastrService, private router : Router,
    private forumHelper : ForumHelperService, private activateRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.heading = this.forumHelper.getHeadingById(this.heading, this.activateRoute);
  }

  savePost(form : NgForm){
    if(form.valid){
      console.log(form.value);
      form.value.heading = this.heading
      this.postService.create(form.value).subscribe( res => {
      });
      this.toastr.success("Votre post va être crée, vous allez ensuite être redirigé vers le forum", "Création valide");
      setTimeout(() => {this.router.navigate(['forum']); }, 3000)
    }
    else {
      this.toastr.error("Vous n'avez pas c  orrectement remplit le champs, réessayer s'il vous plait", "Erreur")
    }
  }
}
