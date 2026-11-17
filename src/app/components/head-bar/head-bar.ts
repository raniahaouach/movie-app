import { Component , inject} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';  
@Component({
  selector: 'app-head-bar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './head-bar.html',
  styleUrl: './head-bar.css',
})
export class HeadBar {
  faHeart = faHeart;
  routeer = inject(Router);
  navigateToWishList() {
    this.routeer.navigate(['wishlist']);
}
}