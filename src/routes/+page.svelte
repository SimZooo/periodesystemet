<script>
    let { data } = $props();
    let last_group = 0;
    let show_el = $state(false);

    /**
     * @param {any} el
     */
    function calculateEl(el) {
        el = Math.max(0, Math.min(el, 3.98));
        if (el == 0) {
            return "255, 255, 255";
        }

        const intensity = 255 - Math.round((el / 3.98) * 150); // Inverse relationship
            const red = Math.round(intensity * 0.7); // Larger decrease in red
            const green = Math.round(intensity * 0.9); // Larger decrease in green
            const blue = Math.round(intensity * 1.2); // Stronger emphasis on blue

            // Clamp blue to a maximum of 255
            const clampedBlue = Math.min(blue, 255);

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
        if (show_el) {
            return "background-color: rgb(" + calculateEl(el) + ")"
        } else {
            return "background-color: rgb(255, 255, 255)"
        }
    }
</script>

<style>
.info {
    opacity: 0;
    font-size: x-small;
}

.element {
    border: solid 2px black;
    width: 60px;
    height: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    transition: 0.5s;
    background-color: white;
}

.element > p {
    padding: 0;
    margin: 0;
}

.element:hover {
    transform: scale(2.0);
    z-index: 1000;
}

.element:hover p {
}

.element:hover .info {
    transition: 0.5s;
    opacity: 1;
}

main {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.periodesystem {
    display: grid;
    grid-template: repeat(7, 1fr) / repeat(18, 1fr);
    gap: 10px 10px;
}
</style>

<main>

<section class="periodesystem">
{#each data.elements as element}
{#each {length: element.element.gruppe - last_group - 1}}
<div></div>
{/each}
<div class="element" 
    style={calculateElementBg(element.element.el)}>
    <p>
    {element.element.num}
    </p>
    <p>
    {element.element.symbol} 
    </p>
    <p class="info">
        {element.element.navn}
    </p>
    {updateLastGroup(element.element.gruppe)} 
</div>
{/each}

</section>

<button onclick={() => show_el = !show_el}> Elektronegativitet </button>
<button> Elektronegativitet </button>
<button> Elektronegativitet </button>

</main>