document.addEventListener('DOMContentLoaded', () => {
    const itemList = document.getElementById('itemList');
    const newItemInput = document.getElementById('newItemInput');
    const addButton = document.getElementById('addItemButton');
    const clearItemsButton = document.getElementById('clearItemsButton');
    const overlay = document.getElementById('overlay');
    const loaderWrapper = document.querySelector('.loader-wrapper');
    const animElements = document.querySelectorAll('.anim-element');


     // Simulate a 1-second loading time – replace with your actual loading logic
    setTimeout(() => {
       loaderWrapper.style.display = 'none';

       animElements.forEach((element, index) => {
           setTimeout(() => {
               element.classList.add('show');
           }, index * 250);  // Adjust delay as needed
       });

       // Enable scrolling after animation
       setTimeout(() => {
           document.body.style.overflow = 'auto';
       }, animElements.length * 250 + 500); // Add buffer


    }, 1000);
    

    function loadBookmarks() {
    const storedItems = localStorage.getItem('items');

    if (storedItems !== null) {
        const parsedItems = JSON.parse(storedItems);
        parsedItems.forEach(item => {
            addItemToList(item.display, item.item, item.isRemovable);
        });
    } else {
        fetch('bookmark.json')
            .then(response => response.json())
            .then(data => {
                const items = [];
                for (const bookmarkName in data) {
                    addItemToList(bookmarkName, data[bookmarkName].url, data[bookmarkName].isRemovable);
                    items.push({
                        display: bookmarkName,
                        item: data[bookmarkName].url,
                        isRemovable: data[bookmarkName].isRemovable
                    });
                }
                localStorage.setItem('items', JSON.stringify(items));
            })
            .catch(error => {
                console.error('Error loading bookmark.json:', error);
                localStorage.setItem('items', JSON.stringify([]));
            });
        }
    }

    function addItemToList(displayValue, itemValue, isRemovable = true) {
        const newItem = document.createElement('li');
        newItem.className = 'item';

        const itemButton = document.createElement('button');
        itemButton.className = 'item-button';
        itemButton.textContent = displayValue;
        itemButton.title = itemValue;
        itemButton.addEventListener('click', () => {
            runScript(itemButton.title);
        });

        newItem.appendChild(itemButton);


        if (isRemovable) { 
            const removeButton = document.createElement('button');
            removeButton.className = 'remove-button';
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                itemList.removeChild(newItem);
                saveItemsToLocalStorage();
            });
            newItem.appendChild(removeButton);
        }


        const editDisplayButton = document.createElement('button');
        editDisplayButton.className = 'edit-display-button';
        editDisplayButton.textContent = 'Edit Name';
        editDisplayButton.addEventListener('click', () => {
            const newDisplayValue = prompt('Enter the new name:', itemButton.textContent);
            if (newDisplayValue !== null) {
                itemButton.textContent = newDisplayValue;
                saveItemsToLocalStorage();
            }
        });
        newItem.appendChild(editDisplayButton);


        itemList.appendChild(newItem);
    }


    function saveItemsToLocalStorage() {
        const items = Array.from(document.querySelectorAll('.item-button')).map(button => {
            const itemElement = button.parentNode; 
            const isRemovable = itemElement.querySelector('.remove-button') !== null;

            return {
                display: button.textContent,
                item: button.title,
                isRemovable: isRemovable
            };
        });
        localStorage.setItem('items', JSON.stringify(items));
    }


    function runScript(selectedItemValue) {
        overlay.style.display = 'flex';

        setTimeout(() => {
            window.parent.postMessage("run:" + selectedItemValue, '*');
        }, 500);
    }

    addButton.addEventListener('click', () => {
        const displayValue = prompt('How do you want the bookmarklet to be called?');
        if (displayValue === null) {
            return;
        }

        const itemValue = newItemInput.value.trim();
        if (!itemValue) {
            return;
        }

        addItemToList(displayValue, itemValue); 
        saveItemsToLocalStorage();
        newItemInput.value = '';
    });

    clearItemsButton.addEventListener('click', () => {
        if (confirm("Are you sure you want to reset ALL bookmarklets? (This action will also load default bookmarks.)")) {
            localStorage.removeItem('items');  
            location.reload(); 
        }
    });
    loadBookmarks();



    
    const logoImg = document.getElementById('logo');
    const images = [
        "https://media.tenor.com/Xrt5kXn6IzwAAAAj/rem-re-zero.gif",
        "https://media.tenor.com/-_R3bbYbLVsAAAAj/ram.gif"
    ];

    let currentIndex = Math.floor(Math.random() * images.length);

    function changeLogoImage() {
        logoImg.style.opacity = 0;

        setTimeout(() => {
            logoImg.src = images[currentIndex];
            currentIndex = (currentIndex + 1) % images.length;
            logoImg.style.opacity = 1;
        }, 150);
    }

    changeLogoImage();

    setInterval(changeLogoImage, 5000);
});