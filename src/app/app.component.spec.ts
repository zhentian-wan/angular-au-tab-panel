import {TestBed, async} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {AuTabPanelComponent} from './au-tab-panel/au-tab-panel.component';
import {AuTabComponent} from './au-tab/au-tab.component';
import {By} from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture, component, el, tabPanel;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AuTabComponent,
        AuTabPanelComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    el = fixture.debugElement;
    tabPanel = el.query(By.css('#tab-panel'));

    fixture.detectChanges();
  }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should have one tabPanel', () => {
    expect(tabPanel).toBeTruthy();
  });

  it('should find only one tab inside the tab container', () => {
    const tabs = tabPanel.queryAll(By.css('.tab'));
    expect(tabs).toBeTruthy();
    const res = tabs.length;
    const expected = 1;
    expect(res).toBe(expected);
  });
  it('should have login tab open', () => {
    const input = tabPanel.query(By.css('input.login-password'));
    expect(input).toBeTruthy();
  });

  it('should find Login tab button marked as active', () => {
    const selectedButton = tabPanel.query(By.css('.tab-panel-buttons li.selected')).nativeElement;
    const res = selectedButton.innerText;
    expect(selectedButton).toBeTruthy();
    expect(res.toLocaleLowerCase()).toBe('login');
  });


  it('should switch to the Contact tab', async () => {
    const tabButtons = tabPanel.queryAll(By.css('.tab-panel-buttons li'));
    expect(tabButtons.length).toBe(3);
    const contactButton = tabButtons[2].nativeElement;
    expect(contactButton.innerText.toLowerCase()).toBe('contact');

    // after click contact tab, contact button should has selected class
    contactButton.click();
    fixture.detectChanges();
    const selectedButton = tabPanel.query(By.css('.tab-panel-buttons li.selected')).nativeElement;
    const res = selectedButton.innerText;
    expect(selectedButton).toBeTruthy();
    expect(res.toLocaleLowerCase()).toBe('contact');

    // the contact tab should be shown
    const input = tabPanel.query(By.css('input.contact-email'));
    expect(input).toBeTruthy();
  });

});
