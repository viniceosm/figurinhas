import { createApp, h } from "vue";

const App = {
  render() {
    return h(
      "div",
      {
        style: "padding:40px;color:white;font-size:32px"
      },
      "FUNCIONOU"
    );
  }
};

createApp(App).mount("#app");