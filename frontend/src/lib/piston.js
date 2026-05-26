export async function executeCode(language, code) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        output:
          "Code executed successfully 🚀\n\nOutput:\n[0, 1]",
      });
    }, 1500);
  });
}