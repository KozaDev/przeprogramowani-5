async function fetchData(params, onSuccess, onError) {
  try {
    const response = await fetch(params.url);
    const parsedResponse = await response.json();
    onSuccess(parsedResponse);
  } catch (error) {
    onError(error);
  }
}

function fetchProfile(userId, onSuccess, onError) {
  return fetchData(
    { method: "GET", url: `http://localhost:8080/app/profile/${userId}` },
    onSuccess,
    onError
  );
}

function fetchPaymentDetails(userId, onSuccess, onError) {
  return fetchData(
    { method: "GET", url: `http://localhost:8080/app/payments/${userId}` },
    onSuccess,
    onError
  );
}

var userProfile = null;
var userId = 4;

async function loadUserData() {
  try {
    await fetchProfile(
      userId,
      (profile) => {
        userProfile = profile;
      },
      () => {
        window.alert("Cannot fetch profile!");
      }
    );

    await fetchPaymentDetails(
      userId,
      (payments) => {
        document.querySelector(
          "#user-name"
        ).textContent = `User: ${userProfile.firstName} ${userProfile.lastName}`;
        document.querySelector(
          "#user-subscription"
        ).textContent = `Subscription: ${payments.subscriptionStatus}`;
      },
      () => {
        window.alert("Cannot fetch payment details!");
      }
    );
  } catch (error) {
    alert(error.message);
  }
}

loadUserData();
