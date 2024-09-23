let mediaRecorder;
let recordedChunks = [];

document.getElementById('startBtn').addEventListener('click', async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
    });

    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, {
            type: 'video/webm'
        });
        const url = URL.createObjectURL(blob);
        const recordedVideo = document.getElementById('recordedVideo');
        recordedVideo.src = url;
        recordedVideo.style.display = 'block';
        recordedVideo.play();
        
        // Reset for next recording
        recordedChunks = [];
    };

    mediaRecorder.start();
    document.getElementById('startBtn').disabled = true;
    document.getElementById('stopBtn').disabled = false;
});

document.getElementById('stopBtn').addEventListener('click', () => {
    mediaRecorder.stop();
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
});
