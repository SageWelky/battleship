export async function animateAppend(parentTarget, childToAppend, customViewTransitionName = "active-append") {
  let originalVTNameHolder = {};
  originalVTNameHolder.name = childToAppend.style?.viewTransitionName;

  childToAppend.style.viewTransitionName = customViewTransitionName;
  childToAppend.classList.add('active-appending-child');

  if (!document.startViewTransition) {
    parentTarget.appendChild(childToAppend);
  } else {
    const transition = document.startViewTransition(() => {
      parentTarget.appendChild(childToAppend);
    });
    // await transition.finished;
  }

  childToAppend.classList.remove('active-appending-child');
  childToAppend.style.viewTransitionName = originalVTNameHolder?.name;
}