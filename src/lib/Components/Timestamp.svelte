<script lang="ts">
	import {onMount} from "svelte";

  let className;
  export { className as class };
	export let date: Date = new Date();
	export let locale: String = "en";

	let displayTime = "";

	function convertTime() {
		let diff = Date.now() - date.getTime();

		const formatter = new Intl.RelativeTimeFormat(locale);

		const {time, timeframe} = getTime(diff);

		displayTime = formatter.format(-time, timeframe);
	}

	function getTime(time: Number) : {time: Number, timeframe: String} {
		const years = Math.floor(time / (1000 * 60 * 60 * 24 * 365));
		if (years > 0) return {time: years, timeframe: 'years'};

		const months = Math.floor(time / (1000 * 60 * 60 * 24 * 30));
		if (months > 0) return {time: months, timeframe: 'months'};

		const days = Math.floor(time / (1000 * 60 * 60 * 24));
		if (days > 0) return {time: days, timeframe: 'days'};

		const hours = Math.floor(time / (1000 * 60 * 60));
		if (hours > 0) return {time: hours, timeframe: 'hours'};

		const minutes = Math.floor(time / (1000 * 60));
		if (minutes > 0) return {time: minutes, timeframe: 'minutes'};

		const seconds = Math.floor(time / 1000);
		return {time: seconds, timeframe: 'second'};
	}

	onMount(() => {
		convertTime();

		// Update time every second to provide a live update
		setInterval(() => {
			convertTime();
		}, 1000);
	});
</script>

<p class={className}>{displayTime}</p>