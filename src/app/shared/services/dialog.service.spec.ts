import {TestBed} from '@angular/core/testing';

import {DialogService} from './dialog.service';
import {MatDialog} from '@angular/material/dialog';
import {of} from 'rxjs';

describe('DialogService', () => {
  let service: DialogService;

  const matDialogMock = {
    open: () => {
      return {}
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to open creation/edition modal', async () => {
    const spy = spyOn(service['dialog'], 'open').and.returnValue({afterClosed: () => of({data: 'data'})} as any);
    await service.openCreationModal('title');
    expect(spy).toHaveBeenCalled();
  });

  it('should be able to open informative modal', async () => {
    const spy = spyOn(service['dialog'], 'open').and.returnValue({afterClosed: () => of({data: 'data'})} as any);
    await service.informativeModal('title', 'error');
    expect(spy).toHaveBeenCalled();
  });

  it('should be able to open questionary modal', async () => {
    const spy = spyOn(service['dialog'], 'open').and.returnValue({afterClosed: () => of({data: 'data'})} as any);
    await service.openInterrogativeModal({title: 'title', message: 'message'});
    expect(spy).toHaveBeenCalled();
  });

});
