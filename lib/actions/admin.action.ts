const EMAIL = "uamir123@gmail.com";
const PASSWORD = "password";
export async function authenticateAdmin(email: string, password: string) {
  try {
    if (email === EMAIL && password === PASSWORD) {
      return JSON.stringify({
        success: true,
      });
    } else {
      return JSON.stringify({
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      success: false,
    });
  }
}
