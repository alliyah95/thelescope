const particlesOptions: any = {
    background: {
        color: "#010204",
    },
    interactivity: {
        events: {
            onClick: {
                enable: false,
            },
            onHover: {
                enable: false,
            },
            resize: true,
        },
        modes: {
            push: {
                quantity: 4,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
        },
    },
    particles: {
        color: {
            value: "#ffffff",
        },
        links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.45,
            width: 0.3,
        },
        collisions: {
            enable: true,
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
        },
        number: {
            density: {
                enable: true,
            },
            value: 200,
        },
        opacity: {
            value: 0.3,
        },
        shape: {
            type: "edge",
        },
        size: {
            random: true,
            value: 2.5,
        },
    },
};

export default particlesOptions;
