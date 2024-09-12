// "use client";

// import { createContext, useEffect, useState } from "react";

// // Create a context to manage the script loading state
// const CloudinaryScriptContext = createContext();

// function CloudinaryUploadWidget({ uwConfig, setPublicId }) {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     // Check if the script is already loaded
//     if (!loaded) {
//       const uwScript = document.getElementById("uw");
//       if (!uwScript) {
//         // If not loaded, create and load the script
//         const script = document.createElement("script");
//         script.setAttribute("async", "");
//         script.setAttribute("id", "uw");
//         script.src = "https://upload-widget.cloudinary.com/global/all.js";
//         script.addEventListener("load", () => setLoaded(true));
//         document.body.appendChild(script);
//       } else {
//         // If already loaded, update the state
//         setLoaded(true);
//       }
//     }
//   }, [loaded]);

//   const initializeCloudinaryWidget = () => {
//     if (loaded) {
//       var myWidget = window.cloudinary.createUploadWidget(
//         uwConfig,
//         (error, result) => {
//           if (!error && result && result.event === "success") {
//             console.log("Done! Here is the image info: ", result.info.url);
//             setPublicId(result.info.public_id);
//           }
//         }
//       );

//       document.getElementById("upload_widget").addEventListener(
//         "click",
//         function () {
//           myWidget.open();
//         },
//         false
//       );
//     }
//   };

//   return (
//     <CloudinaryScriptContext.Provider value={{ loaded }}>
//       <button
//         id="upload_widget"
//         className="cloudinary-button"
//         onClick={initializeCloudinaryWidget}
//       >
//         Upload
//       </button>
//     </CloudinaryScriptContext.Provider>
//   );
// }

// export default CloudinaryUploadWidget;
// export { CloudinaryScriptContext };

// CloudinaryUploadWidget.jsx

"use client";

import { createContext, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget({ uwConfig, onUploadSuccess, title }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = (e) => {
    e.preventDefault();
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            if (typeof onUploadSuccess === "function") {
              onUploadSuccess(result.info.url); // Use the callback to pass the URL
              toast.success("File uploaded successfully");
            }
          }
        }
      );

      document.getElementById("upload_widget").addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className=""
        type="button"
        onClick={initializeCloudinaryWidget}
      >
        {title}
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
