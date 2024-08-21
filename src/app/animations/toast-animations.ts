import { AnimationController } from '@ionic/angular';

const enterAnimation = (baseEl: any) => {
  const root = baseEl;
  const animationCtrl = new AnimationController();

  const backdropAnimation = animationCtrl.create()
    .addElement(root.querySelector('ion-backdrop')!)
    .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

  const wrapperAnimation = animationCtrl.create()
    .addElement(root.querySelector('.toast-wrapper')!)
    .keyframes([
      { offset: 0, opacity: '0.5', transform: 'translateY(150%)' },
      { offset: 1, opacity: '1', transform: 'translateY(0%)' }
    ]);

  return animationCtrl.create()
    .addElement(baseEl)
    .easing('ease-in-out')
    .duration(500)
    .addAnimation([backdropAnimation, wrapperAnimation]);
}
const leaveAnimation = (baseEl: any) => {
  return enterAnimation(baseEl).direction('reverse');
}

export { enterAnimation, leaveAnimation }