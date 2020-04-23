import { one } from './event.js';

export const supportTransform = 'webkitTransform' in document.body.style || 'transform' in document.body.style;
export const supportTransitions = 'webkitTransition' in document.body.style || 'transition' in document.body.style;
export const transitionEndEvent = 'webkitTransition' in document.body.style ? 'webkitTransitionEnd' : 'transitionend';
export const transitionDuration = 'webkitTransition' in document.body.style ? 'webkitTransitionDuration' : 'transitionDuration';

export function getElementTransitionDuration (element) {
  let duration = supportTransitions ? window.getComputedStyle(element)[transitionDuration] : 0;
  duration = parseFloat(duration);
  duration = typeof duration === 'number' && !isNaN(duration) ? duration * 1000 : 0;
  return duration;
}

// emulateTransitionEnd
export function emulateTransitionEnd (element,handler){ 
  let called = 0, duration = getElementTransitionDuration(element);
  duration ? one(element, transitionEndEvent, function(e){ !called && handler(e), called = 1; })
           : setTimeout(function() { !called && handler(), called = 1; }, 17);
}