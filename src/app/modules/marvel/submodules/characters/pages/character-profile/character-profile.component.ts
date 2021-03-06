import { Component, OnInit, OnDestroy } from '@angular/core';
import { CharactersFacade } from '@domain/application/facade';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CHARACTERS_DETAIL, COMICS_ROUTE, STORIES_ROUTE } from '@utils/constants';
import { IFacadeApiMap } from '@utils/interfaces/auxiliary';
import { ICharactersResponse } from '@utils/interfaces/response';
import { EntityProfile } from '@utils/classes';
import { BookmarksFacade } from '@domain/application/facade/bookmarks/bookmarks.facade';
import { MarvelEntity } from '@domain/model/enums';

/**
 * `Smart Component` for displaying detailed character info
 */
@Component({
  templateUrl: './character-profile.component.html',
  styleUrls: ['./character-profile.component.scss']
})
export class CharacterProfileComponent extends EntityProfile implements OnInit, OnDestroy {

  readonly type = MarvelEntity.CHARACTERS;
  character$!: Observable<IFacadeApiMap<ICharactersResponse>>;

  constructor(
    private readonly characterFacade: CharactersFacade,
    private readonly route: ActivatedRoute,
    public readonly router: Router,
    public readonly bookmarksFacade: BookmarksFacade
  ) { super(router, bookmarksFacade); }

  // tslint:disable-next-line: completed-docs
  ngOnInit(): void {
    this.character$ = this.characterFacade.getById(this.route.snapshot.params[CHARACTERS_DETAIL]);
    this.initializeRoutes(COMICS_ROUTE, STORIES_ROUTE);
  }

  // tslint:disable-next-line: completed-docs
  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }
}
