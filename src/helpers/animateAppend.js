export async function animateAppend(parentTarget, childToAppend, customViewTransitionName = "append") {
  let originalVTNHolder = {};
  let reinstateVTNBool = false;
  if ('viewTransitionName' in childToAppend.style) {
    originalVTNHolder.name = childToAppend.style?.viewTransitionName;
    reinstateVTNBool = true;
  }


  childToAppend.style.viewTransitionName = customViewTransitionName;
  childToAppend.classList.add('active-appending-child');

  if (!document.startViewTransition) {
    parentTarget.appendChild(childToAppend);
  } else {
    let transition = document.startViewTransition(() => {
      parentTarget.appendChild(childToAppend);
    });
    await transition.finished;
  }

  childToAppend.classList.remove('active-appending-child');
  if (reinstateVTNBool) {
    childToAppend.style.viewTransitionName = originalVTNHolder?.name;
  } else {
    childToAppend.style.removeProperty('view-transition-name');
  }
}