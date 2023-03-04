const CLIPBOARD_ONLY_CLASS = 'clipboard-only';
    const NO_COPY_CLASS = 'no-copy';

    const setMessage = (text) => {
      let messageElement = document.getElementById("clipboard-message");
      messageElement.textContent = text;
    }

    const copyContentsText = (text) => copyContents(
      {copyableText: text});

    const copyContentsById = (id) => copyContents(
      {copyableElement: document.getElementById(id)});

    const copyContents = async ({ copyableText, copyableElement }) => {
      const textareaElement = document.getElementById("clipboard-contents");
      console.log(textareaElement)
      const buttonElement = document.getElementById("clipboard-button");
      // Use \r\n for Windows compatibility
      copyableText = Array.isArray(copyableText) ? copyableText.join("\r\n") : copyableText;
      if ("navigator" in window && navigator.clipboard && copyableText) {
        // Modern navigator API, supports writing text.
        await navigator.clipboard.writeText(copyableText);
        setMessage("Copied to clipboard!");
      } else if (textareaElement) {
        // Fallback if navigator API is not supported in older browsers, or if
        // we need to copy actual HTML.
        if (copyableElement) {
          // Temporarily unhide any invisible elements.
          $(copyableElement).find(`.${CLIPBOARD_ONLY_CLASS}`).show();
          $(copyableElement).find(`.${NO_COPY_CLASS}`).hide();
          // Handle the selection.
          if (window.getSelection()) window.getSelection().removeAllRanges();
          const range = document.createRange();
          range.selectNode(copyableElement);
          if (window.getSelection()) window.getSelection().addRange(range);
          // Hide the button or else will copy itself too
          if (buttonElement) $(buttonElement).hide();
          // Command to do the copying
          document.execCommand("copy");
          // Show the button again.
          if (buttonElement) $(buttonElement).show();
          // Hide invisible elements again.
          $(copyableElement).find(`.${CLIPBOARD_ONLY_CLASS}`).hide();
          $(copyableElement).find(`.${NO_COPY_CLASS}`).show();
        } else {
          // Temporarily show the textarea so it can be copied.
          textareaElement.style.display = "block";
          textareaElement.select();
          if (buttonElement) $(buttonElement).hide();
          document.execCommand("copy");
          if (buttonElement) $(buttonElement).show();
          textareaElement.style.display = "none";
        }
        if (window.getSelection()) window.getSelection().removeAllRanges();
        setMessage("Copied to clipboard!");
      } else {
        setMessage(
          "Failed to copy to clipboard! Please contact us if you see this error."
        );
        return;
      }
      setTimeout(() => void setMessage("Copy to Clipboard"), 3000);
    };

    // Set up event handler to call copy function when the button is clicked
    document.getElementById("clipboard-button").addEventListener(
      "click", () => copyContentsById("puzzle-contents-copyable"));
    // Example where we only want to copy a plaintext (text/plain only, no
    // text/html) string instead.
    // document.getElementById("clipboard-button").addEventListener(
    //   "click", () => copyContentsText("Plain text content to copy."));