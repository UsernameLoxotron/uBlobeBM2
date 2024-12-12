const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Varela+Round:wght@400&display=swap";
document.head.appendChild(fontLink);

let blobFrame = null;
let blobFrameContainer = null;

document.addEventListener("keydown", function(blob) {
    if (
        (blob.key == "~" && blob.ctrlKey) || // Ctrl+~
        (blob.key == "`" && blob.ctrlKey) && // Ctrl+`
        !blobFrame 
    ) {
        if (blobFrame) {
            closeWithAnimation(blobFrameContainer);
            blobFrame = null;
            return;
        }

        blobFrameContainer = document.createElement("div");
        blobFrameContainer.style.cssText = `
            position: fixed;
            width: 400px;
            height: 750px;
            z-index: 9999;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            background-color: #ffffff;
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        `;

        blobFrame = document.createElement("iframe");
        blobFrame.src = "https://usernameloxotron.github.io/uBlobeBM2/main.html";
        blobFrame.style.cssText = `
            width: 100%;
            height: calc(100% - 34px);
            border: none;
            position: absolute;
            top: 34px;
            display: block;
        `;

        const bar = document.createElement("div");
        bar.style.cssText = `
            width: 100%;
            height: 34px;
            background-color:rgb(40, 143, 44);
            position: relative;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            user-select: none;
            cursor: move;
        `;

        const closeButton = document.createElement("button");
        closeButton.innerText = "×";
        closeButton.style.cssText = `
            position: absolute;
            top: 50%;
            right: 15px;
            transform: translateY(-50%);
            background: none;
            border: none;
            font-size: 20px;
            color: #fff;
            cursor: pointer;
            transition: color 0.3s ease;
        `;
        closeButton.addEventListener("mouseenter", function() {
            closeButton.style.color = "#046908";
        });
        closeButton.addEventListener("mouseleave", function() {
            closeButton.style.color = "#fff";
        });
        closeButton.addEventListener("click", closeIframe);

        const titleText = document.createElement("div");
        titleText.innerText = "uBlobeBM2";
        titleText.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            font-size: 16px;
            font-family: 'Varela Round', sans-serif;
            user-select: none;
        `;

        bar.appendChild(titleText);
        bar.appendChild(closeButton);

        bar.addEventListener("mousedown", startDragging);

        blobFrameContainer.appendChild(blobFrame);
        blobFrameContainer.appendChild(bar);

        document.body.appendChild(blobFrameContainer);

        requestAnimationFrame(() => {
            blobFrameContainer.style.opacity = "1";
            blobFrameContainer.style.transform = "translate(-50%, -47%) translateY(0)";
        });

        window.addEventListener("message", handleMessage);
    }
});

let offsetX, offsetY;
let isDragging = false;

function startDragging(e) {
    const rect = blobFrameContainer.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    isDragging = true;
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDragging);
    blobFrame.style.pointerEvents = "none";
    blobFrameContainer.style.transition = 'none';
}

function drag(e) {
    if (!isDragging) return;
    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    newX = Math.min(Math.max(newX, 0), window.innerWidth - blobFrameContainer.offsetWidth);
    newY = Math.min(Math.max(newY, 0), window.innerHeight - blobFrameContainer.offsetHeight);

    blobFrameContainer.style.left = newX + "px";
    blobFrameContainer.style.top = newY + "px";
    blobFrameContainer.style.transform = 'none';
}

function stopDragging() {
    isDragging = false;
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDragging);
    blobFrame.style.pointerEvents = "auto";
    blobFrameContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
}

function closeIframe() {
    closeWithAnimation(blobFrameContainer);
    blobFrame = null;
    window.removeEventListener("message", handleMessage);
}

function handleMessage(message) {
    if (message.data.toString().startsWith("run:")) {
        closeWithAnimation(blobFrameContainer);
        blobFrame = null;

        setTimeout(() => {  // Keep the setTimeout for correct execution timing

            try {
                let bookmarkletCode = message.data.toString().replace("run:", "");
                let decodedCode = decodeURIComponent(bookmarkletCode);
                eval(decodedCode); 

            } catch (error) {
                console.error('Error executing bookmarklet:', error);
                alert('An error occurred while executing the bookmarklet. Check the code for errors.\nError details: ' + error.message);
            } 

        }, 200);  // Keep the delay
    }
}

function closeWithAnimation(element) {
    element.style.transition = "opacity 0.3s ease";
    element.style.opacity = "0";

    setTimeout(() => {
        element.remove();
    }, 200);
}
