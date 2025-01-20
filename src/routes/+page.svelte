<script>
    let { data } = $props();
    let last_group = 0;
    let show_el = $state(false);
    let show_mpn = $state(false);
    let show_info = $state(false);
    let current_element = $state(data.elements[0].element);

    /**
     * @param {{ el: number; mpn: number; navn: string }} element
     */
    function calculateEl(element) {
        let val = 0;
        let red = 0;
        let green = 0;
        let blue = 0;
        if (show_el) {
            val = Math.max(0, Math.min(element.el, 3.98));

            const intensity = 200 - Math.round((val / 3.98) * 150);
            red = Math.round(intensity * 0.9);
            green = Math.round(intensity * 0.9);
            blue = Math.round(intensity * 1.2);


        } else if (show_mpn) {
            val = (element.mpn * 100 % 10) / 10;
            const intensity = 255 - Math.round((val - 0.9) * 150);

            // Beregn fargekomponentene
            red = Math.round(intensity * 0.8); 
            green = Math.round(intensity * 0.9);
            blue = Math.round(intensity * 1.1);

            // Clamp alle fargekomponenter mellom 0 og 255
            red = Math.min(Math.max(red, 0), 255);
            green = Math.min(Math.max(green, 0), 255);
            blue = Math.min(Math.max(blue, 0), 255);
        }

        if (val == 0) {
            return "255, 255, 255";
        }

        return red + "," + green + "," + blue
    }

    /**
     * @param {number} group
     */
    function updateLastGroup(group) {
        last_group = group
    }

    /**
     * @param {any} el
     */
    function calculateElementBg(el) {
        return "background-color: rgb(" + calculateEl(el) + ")"
    }

    /**
     * @param {{ navn: string; symbol: string; periode: number; gruppe: number; el: number; num: number; mpn: number; }} el
     */
    function elementClicked(el) {
        if (current_element.navn == el.navn) {
            current_element.navn = "undefined";
            show_info = false;
        }
        else {
            current_element = el;
            show_info = true;
        }
    }
    
    function createInfoText() {
        let header = current_element.navn;
        return header;
    }
</script>

<style>
.navn {
    opacity: 0;
    font-size: x-small;
}

.element {
    width: 5.556rem;
    height: 5.556rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    transition: 0.5s;
    background-color: white;
    font-weight: bold;
    font-size: x-large;
}

.element-large {
    width: 7em;
    height: 7em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    transition: 0.5s;
    background-color: white;
    font-weight: bold;
    font-size: x-large;
    grid-column: 2 / 2;
}

.element > p {
    padding: 0;
    margin: 0;
}

.element:hover {
    transform: scale(2.0);
    z-index: 1000;
}

.element:hover .navn {
    transition: 0.5s;
    opacity: 1;
}

main {
    display: grid;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    margin: 0;
    padding: 0;
}

:global(body) {
    background-color: #272727;
    color: #272727;
    margin: 0;
    padding: 0;
}

#info {
    display: grid;
    place-self: center;
    font-weight: 600;
    width: 100%;
    margin: 0;
    padding: 0;
    height: 200px;
    background-color: #006AE5;
    grid-template: 1fr / repeat(5, 1fr) ;
}

.periodesystem {
    display: grid;
    place-self: center;
    grid-template: repeat(7, 1fr) / repeat(18, 1fr);
    gap: 5px;
}

button {
    border: solid 2px #272727;
    padding: 10px;
    box-shadow: none;
    background-color: white;
    font-weight: bold;
    font-size: large;
}

#buttons {
    place-self: center;
}
</style>

<main>
<div class="periodesystem">
    {#each data.elements as element}
    {#each {length: element.element.gruppe - last_group - 1}}
    <div></div>
    {/each}
    <button onclick={() => elementClicked(element.element)} class="element" 
        style={calculateElementBg(element.element)}>
        <p>{element.element.num}</p>
        <p>{element.element.symbol} </p>
        <p class="navn">{element.element.navn}</p>

        {updateLastGroup(element.element.gruppe)} 
    </button>
    {/each}
</div>
<div style="display: {show_info ? "grid" : "none"}" id="info">
    <div class="element-large">
        <p>{current_element.num}</p>
        <p>{current_element.symbol} </p>
    </div>
    <div>
        <h3>{current_element.navn}</h3>
    </div>
</div>
<div id="buttons">
    <button onclick={() => {show_el = !show_el; show_mpn = false;}}> Elektronegativitet </button>
    <button onclick={() => {show_mpn = !show_mpn; show_el = false;}}> Masse-per-nukleon </button>
</div>
</main>