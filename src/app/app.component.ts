import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  jsonData: any;
  lastSelectedIndex: number;
  selectedNote!: { note: string, sons: string };

  constructor(private notesService: NotesService) {
    this.lastSelectedIndex = -1;
  }

  ngOnInit(): void {
    this.getJsonData();
  }

  updateSelectedNote(): void {
    this.selectedNote = this.numberRandom();
  }

  getJsonData(): void {
    this.notesService.getJsonData()
      .subscribe(
        data => {
          this.jsonData = data;
          this.updateSelectedNote();
        },
        error => {
          console.error('Error fetching JSON data:', error);
        }
      );
  }

  numberRandom(): { sons: string, note: string } {
    let randomNumber: number;

    do {
      randomNumber = Math.floor(Math.random() * this.jsonData.length);
    } while (randomNumber === this.lastSelectedIndex); // Répéter tant que le numéro aléatoire est le même que celui précédent

    this.lastSelectedIndex = randomNumber; // Mise à jour de l'index sélectionné

    const selectedNote = this.jsonData[randomNumber];
    return { sons: selectedNote.sons, note: selectedNote.note };
  }

}
