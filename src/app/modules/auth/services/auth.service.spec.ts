import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import * as mockRaw from '../../../data/user.json'
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let mockUser: any = (mockRaw as any).default
  let HttpClientSpy: { post: jasmine.Spy }

  //TODO: lo que se ejecuta cada vez antes de cada enunciado
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule ]
    });
    HttpClientSpy = jasmine.createSpyObj('HttpClient', ['post'])
    service = new AuthService(HttpClientSpy as any)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //TODO: Prueba del SendCredentials
  
  it('🆔 Debe retornar un objeto con "data" y "tokenSession"', () => {
    //TODO: Arrange
    const user: any = mockUser.userOk
    HttpClientSpy.post.and.returnValue(
      of({a:1})
    ) 
    
    //TODO: Act
    service.sendCredentials(user.email, user.password)
      .subscribe( responseApi =>  {
        console.log('🎁🎁🎁 ', responseApi)
      })

  })

});
