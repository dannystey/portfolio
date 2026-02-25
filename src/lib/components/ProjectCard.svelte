<script lang="ts">
	import type { TogglProject } from '$lib/server/toggl';

	let { project }: { project: TogglProject } = $props();

	// Hilfsfunktion für die Farbdarstellung
	// Toggl liefert Hex-Codes (z.B. #06aaf5)
	const projectColor = project.color || '#cccccc';

	// Pokémon-Karten-Stil: Typ, HP, Attacken, etc.
	// Hier: Client (Typ), Name (Pokémon Name), Zeit (HP/Attacken)
	const clientName = project.client?.name || 'Unbekannter Client';
	const actualHours = project.actual_hours !== null ? project.actual_hours.toFixed(1) : '0.0';
	const estimatedHours = project.estimated_hours || 0;
	const progress = estimatedHours > 0 ? Math.min(100, (Number(actualHours) / estimatedHours) * 100) : 0;
</script>

<div
	class="relative w-72 h-96 rounded-xl p-4 shadow-2xl transition-transform duration-300 hover:scale-105 overflow-hidden group border-4"
	style="border-color: {projectColor}; background: linear-gradient(135deg, {projectColor}22 0%, #ffffff 100%);"
>
	<!-- Card Glow Effect -->
	<div
		class="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"
		style="background: radial-gradient(circle at 50% 50%, {projectColor} 0%, transparent 70%);"
	></div>

	<!-- Header: Name and HP (Hours) -->
	<div class="flex justify-between items-start mb-2 relative z-10">
		<h3 class="font-bold text-lg leading-tight text-gray-800 drop-shadow-sm truncate pr-2">
			{project.name}
		</h3>
		<div class="flex items-center gap-1 shrink-0">
			<span class="text-[10px] font-bold text-gray-500 uppercase">HP</span>
			<span class="text-xl font-black italic text-gray-800">{actualHours}h</span>
		</div>
	</div>

	<!-- Image/Visual Area -->
	<div
		class="w-full h-40 rounded-lg mb-4 border-2 flex items-center justify-center relative overflow-hidden bg-gray-50"
		style="border-color: {projectColor}44;"
	>
		<!-- Background Pattern -->
		<div class="absolute inset-0 opacity-10" style="background-image: radial-gradient({projectColor} 1px, transparent 1px); background-size: 10px 10px;"></div>
		
		<!-- Large Initial -->
		<span class="text-7xl font-black opacity-20 transition-transform duration-500 group-hover:scale-110" style="color: {projectColor}">
			{project.name.charAt(0)}
		</span>
		
		<!-- Type Badge -->
		<div 
			class="absolute bottom-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm"
			style="background-color: {projectColor}"
		>
			{clientName}
		</div>
	</div>

	<!-- Info Bar -->
	<div class="bg-gray-100/50 rounded-sm px-2 py-0.5 mb-4 text-[10px] italic text-gray-600 border-b border-gray-200 relative z-10">
		ID: {project.id} • Erstellt: {new Date(project.created_at).toLocaleDateString('de-DE')}
	</div>

	<!-- Attacks / Stats Area -->
	<div class="space-y-3 relative z-10">
		<!-- Progress Stat -->
		<div class="flex flex-col">
			<div class="flex justify-between text-[10px] font-bold text-gray-700 mb-1 px-1">
				<span>ESTIMATED: {estimatedHours}h</span>
				<span>{progress.toFixed(0)}%</span>
			</div>
			<div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
				<div 
					class="h-full transition-all duration-1000 ease-out" 
					style="width: {progress}%; background-color: {projectColor}"
				></div>
			</div>
		</div>

		<!-- Status Info -->
		<div class="flex items-center gap-2 px-1">
			<div class="w-2 h-2 rounded-full {project.active ? 'bg-green-500' : 'bg-red-500'} animate-pulse"></div>
			<span class="text-xs font-semibold text-gray-700">{project.active ? 'Aktiv' : 'Inaktiv'}</span>
			<span class="text-xs text-gray-400 ml-auto">{project.is_private ? '🔒 Privat' : '🌍 Öffentlich'}</span>
		</div>
	</div>

	<!-- Footer / Flavor Text -->
	<div class="absolute bottom-3 left-4 right-4 pt-2 border-t border-gray-200/50">
		<p class="text-[9px] text-gray-400 italic leading-tight text-center">
			Ein seltener Einblick in die Zeitmaschine. Jede Stunde zählt auf dem Weg zum Ziel.
		</p>
	</div>
</div>

<style>
	/* Kartenglanzeffekt bei Hover */
	.group:hover::after {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: linear-gradient(
			45deg,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 0.1) 45%,
			rgba(255, 255, 255, 0.4) 50%,
			rgba(255, 255, 255, 0.1) 55%,
			rgba(255, 255, 255, 0) 100%
		);
		transform: rotate(45deg);
		transition: all 0.5s;
		pointer-events: none;
	}
</style>
