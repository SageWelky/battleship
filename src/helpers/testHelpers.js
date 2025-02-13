export function testHelper() {
  const titleSplash = document.getElementById('title-splash');
  const titleTest = document.getElementById('title-test');

  if (!document.startViewTransition) {
    titleSplash.style.visibility = 'hidden';
    titleTest.style.visibility = 'visible';
  } else {
    document.startViewTransition(() => {
      titleSplash.style.visibility = 'hidden';
      titleTest.style.visibility = 'visible';
    });
  }
}
