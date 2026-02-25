# Umsetzungsplan für Three.js Szene in Books.svelte

Dieses Dokument beschreibt das geplante Vorgehen zur Implementierung einer Three.js Szene in der Svelte-Komponente `Books.svelte`, um das Modell `book.glb` anzuzeigen.

## Schritte der Implementierung

1.  **Vorbereitung der Komponente:**
    *   Sicherstellen, dass `THREE` und `onMount` importiert sind.
    *   Importieren des `GLTFLoader` aus dem Three.js Beispiel-Verzeichnis.

2.  **Initialisierung der Three.js Szene (innerhalb von `onMount`):**
    *   **Scene:** Erstellen der Szene-Instanz.
    *   **Camera:** Erstellen einer `PerspectiveCamera`. Die Kamera wird leicht erhöht positioniert, um den gewünschten Blickwinkel von oben zu erhalten.
    *   **Renderer:** Erstellen des `WebGLRenderer` mit Alpha-Kanal für Transparenz (falls gewünscht) und Antialiasing. Anheften des Renderer-Canvas an das `#container` Div.
    *   **Beleuchtung:** Hinzufügen eines `AmbientLight` für Grundhelligkeit und eines `DirectionalLight`, um die Details des Buchmodells hervorzuheben.

3.  **Laden des Modells:**
    *   Verwenden des `GLTFLoader`, um `/models/book.glb` zu laden.
    *   Nach dem Laden:
        *   Berechnen der Bounding Box des Modells, um es exakt in der Mitte der Szene zu platzieren.
        *   Skalieren des Modells, falls es zu groß oder zu klein für die Ansicht ist.
        *   Hinzufügen des Modells zur Szene.

4.  **Render Loop:**
    *   Implementierung einer `animate`-Funktion, die `requestAnimationFrame` nutzt.
    *   Aktualisierung der Szene in jedem Frame.
    *   Rotation des Buches um die Y-Achse (`model.rotation.y += 0.01`).

5.  **Responsivität:**
    *   Hinzufügen eines Event Listeners für `resize`, um die Kamera-Aspekt-Ratio und die Renderer-Größe bei Fensteränderungen anzupassen.

6.  **Cleanup:**
    *   Bereinigen des Renderers und der Event Listener beim Unmount der Komponente.
