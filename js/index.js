document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cards = document.querySelectorAll('.card');
    
    // Clone cards for infinite loop
    const cardArray = Array.from(cards);
    cardArray.forEach(card => {
        const clone = card.cloneNode(true);
        slider.appendChild(clone);
    });
    
    const allCards = document.querySelectorAll('.card');
    let currentIndex = 0;
    let isTransitioning = false;
    
    function updateSlider(direction) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        const cardWidth = allCards[0].offsetWidth + 20; // including gap
        const totalOriginalCards = cards.length;
        
        if (direction === 'next') {
            currentIndex++;
            if (currentIndex >= totalOriginalCards) {
                // When reaching the end of original cards, jump to start
                setTimeout(() => {
                    slider.style.transition = 'none';
                    currentIndex = 0;
                    slider.style.transform = `translateX(0)`;
                    setTimeout(() => {
                        slider.style.transition = 'transform 0.5s ease';
                    }, 50);
                }, 500);
            }
        } else if (direction === 'prev') {
            currentIndex--;
            if (currentIndex < 0) {
                // When reaching the start, jump to the end
                setTimeout(() => {
                    slider.style.transition = 'none';
                    currentIndex = totalOriginalCards - 1;
                    slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
                    setTimeout(() => {
                        slider.style.transition = 'transform 0.5s ease';
                    }, 50);
                }, 500);
            }
        }
        
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
    
    prevBtn.addEventListener('click', () => {
        updateSlider('prev');
    });
    
    nextBtn.addEventListener('click', () => {
        updateSlider('next');
    });
    
    // Auto-rotate (optional)
    let autoRotate = setInterval(() => {
        updateSlider('next');
    }, 3000);
    
    // Pause auto-rotate on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoRotate);
    });
    
    slider.addEventListener('mouseleave', () => {
        autoRotate = setInterval(() => {
            updateSlider('next');
        }, 3000);
    });
});

const roles = {
    controller: {
        title: "CONTROLLER",
        desc: "Controllers are experts in slicing up dangerous territory to set their team up for success.",
        agents: "assets/index/roles/controllergroup.png"
    },
    duelist: {
        title: "DUELIST",
        desc: "Duelists are self-sufficient fraggers who their team expects, through abilities and skills, to get high frags and seek out engagements first.",
        agents: "assets/index/roles/duelistgroup.png"
    },
    initiator: {
        title: "INITIATOR",
        desc: "Initiators challenge angles by setting up their team to enter contested ground and push defenders away.",
        agents: "assets/index/roles/initiatorgroup.png"
    },
    sentinel: {
        title: "SENTINEL",
        desc: "Sentinels are defensive experts who can lock down areas and watch flanks, both on attacker and defender rounds.",
        agents: "assets/index/roles/sentinelgroup.png"
    },
}

function selectRole(role){
    const { title, desc, agents } = roles[role];

  const agentsimg = document.getElementById("role-group-image");
  agentsimg.classList.add("slide-out")

  setTimeout(() => {
    document.getElementById("role-agent-title").textContent = title;
    document.getElementById("role-agent-text").textContent = desc;

    
    agentsimg.src = agents
    agentsimg.classList.remove("slide-out")
    agentsimg.classList.add("slide-in")

    setTimeout(() => {
        agentsimg.classList.remove("slide-in")
    }, 100);
  }, 300)
}