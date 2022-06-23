import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPageComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]      
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //TODO: Debe asegurarse que el enunciado que el formulario sea invalido cuando ingrese
  
  //TODO: Patrón AAA  
  it('🔴 Deberia de retornar invalido el formulario', () => {

    //TODO: Arrange

    const mockCredencials = {
      email: '0x0x0x0x',
      password: '111111111111111111'
    }

    const emailForm = component.formLogin.get('email')
    const passwordForm = component.formLogin.get('password')

    //TODO: Act

    emailForm?.setValue(mockCredencials.email)
    passwordForm?.setValue(mockCredencials.password)

    //TODO: Asert    

    expect(component.formLogin.invalid).toEqual(true)
  });

  it('✅ Deberia de retornar valido el formulario', () => {

    //TODO: Arrange

    const mockCredencials = {
      email: 'test@text.com',
      password: '12345678'
    }

    const emailForm = component.formLogin.get('email')
    const passwordForm = component.formLogin.get('password')

    //TODO: Act

    emailForm?.setValue(mockCredencials.email)
    passwordForm?.setValue(mockCredencials.password)

    //TODO: Asert    

    expect(component.formLogin.invalid).toEqual(false)
  });


  it('🆎 El boton deberia de tener la palaba "Iniciar sesión"', () => {
    const elementRef = fixture.debugElement.query(By.css('.form-action button'))
    const getInnerText = elementRef.nativeElement.innerText

    expect(getInnerText).toEqual('Iniciar sesión')
  })

});
