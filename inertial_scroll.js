import {LINEAR_INTERPOLATION as lerp} from './lerp.js';

class InertialElement {
  constructor({parentNode, velocity}) {
    this.parentNode = parentNode;
    this.velocity = velocity;

    this.currentScrollPos = {
      x: 0,
      y: 0
    }

    this.computedScrollPos = {
      x: 0,
      y: 0
    }
  }

  defineBodyHeight() {
    document.body.style.height = this.parentNode.clientHeight;
  }

  init() {
    this.defineBodyHeight();
    addEventListener('resize', this.defineBodyHeight);
    addEventListener('scroll', scroll);

    function scroll() {
  	  this.currentScrollPos.x = window.pageXOffset;
  	  this.currentScrollPos.y = window.pageYOffset;
  	}

    window.requestAnimationFrame(this.render);
  }

  computeScrollPos() {
    this.computedScrollPos.x = lerp(
      this.computedScrollPos.x, this.currentScrollPos.x, this.velocity
    );
    this.computedScrollPos.y = lerp(
      this.computedScrollPos.y, this.currentScrollPos.y, this.velocity
    );
  }

  render() {
    this.computeScrollPos();
    this.parentNode.style.transform = `
      translate3d(-${this.computedScrollPos.x}px, -${this.computedScrollPos.y}px, 0)
    `;
    window.requestAnimationFrame(this.render);
  }
}

new InertialElement({
  parentNode: main,
  velocity: 0.07
}).init();
