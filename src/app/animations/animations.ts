import { animate, group, state, style, transition, trigger } from '@angular/animations';

const FADE_IN_OUT = 200;
const FADE_IN = 400;

export const slideInOut = trigger('slideInOut', [
  state('in', style({ height: '*', opacity: 0 })),

  transition(':leave', [
    style({ height: '*', opacity: 1, overflow: 'hidden' }),

    group([animate(300, style({ height: 0 })), animate('200ms ease-in-out', style({ opacity: '0' }))])
  ]),

  transition(':enter', [
    style({ height: '0', opacity: 0, overflow: 'hidden' }),

    group([animate(300, style({ height: '*' })), animate('400ms ease-in-out', style({ opacity: '1' }))])
  ])
]);

export const slideInOutFast = trigger('slideInOutFast', [
  state('in', style({ height: '*', opacity: 0 })),

  transition(':leave', [
    style({ height: '*', opacity: 1, overflow: 'hidden' }),

    group([animate(150, style({ height: 0 })), animate('100ms ease-in-out', style({ opacity: '0' }))])
  ]),

  transition(':enter', [
    style({ height: '0', opacity: 0, overflow: 'hidden' }),

    group([animate(150, style({ height: '*' })), animate('200ms ease-in-out', style({ opacity: '1' }))])
  ])
]);

export const fadeInOut = trigger('fadeInOut', [
  state('in', style({ opacity: 1 })),
  transition(':enter', [style({ opacity: 0 }), animate(FADE_IN_OUT)]),
  transition(':leave', animate(FADE_IN_OUT, style({ opacity: 0 })))
]);

export const fadeIn = trigger('fadeIn', [
  state('hidden', style({ opacity: 0 })),
  state('visible', style({ opacity: 1 })),
  transition('hidden => visible', [animate(FADE_IN)])
]);

// --------

// https://stackblitz.com/edit/angular-muvaqu
export const slideInOutAnimation = [
  trigger('slideInOut', [
    state(
      'in',
      style({
        'max-height': '500px',
        opacity: '1',
        visibility: 'visible'
      })
    ),
    state(
      'out',
      style({
        'max-height': '0px',
        opacity: '0',
        visibility: 'hidden'
      })
    ),
    transition('in => out', [
      group([
        animate(
          '400ms ease-in-out',
          style({
            opacity: '0'
          })
        ),
        animate(
          '600ms ease-in-out',
          style({
            'max-height': '0px'
          })
        ),
        animate(
          '700ms ease-in-out',
          style({
            visibility: 'hidden'
          })
        )
      ])
    ]),
    transition('out => in', [
      group([
        animate(
          '1ms ease-in-out',
          style({
            visibility: 'visible'
          })
        ),
        animate(
          '600ms ease-in-out',
          style({
            'max-height': '500px'
          })
        ),
        animate(
          '800ms ease-in-out',
          style({
            opacity: '1'
          })
        )
      ])
    ])
  ])
];
