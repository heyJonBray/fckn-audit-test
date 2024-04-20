// Chain list as provided
const chains = [
  'Arbitrum',
  'Avalanche',
  'Base',
  'Blast',
  'BSC',
  'Canto',
  'Degen',
  'Ethereum',
  'Fantom',
  'Kava',
  'Linea',
  'Optimism',
  'Polygon',
  'Polygon ZKEVM',
  'Pulse',
  'Scroll',
  'zkSync',
  'Zora',
];

let currentStartIndex = 0; // Pagination start index

// Function to normalize chain names
function normalizeChainName(chain) {
  return chain.replace(/\s+/g, '').toLowerCase();
}

// Dynamically add chain selection buttons when the chain page loads
window.onload = function () {
  displayChains();
};

function displayChains() {
  const container = document.getElementById('chainsContainer');
  if (container) {
    container.innerHTML = ''; // Clear previous buttons
    const endIndex = Math.min(currentStartIndex + 3, chains.length);
    for (let i = currentStartIndex; i < endIndex; i++) {
      const chain = chains[i];
      const button = document.createElement('button');
      button.textContent = chain;
      button.onclick = function () {
        selectChain(chain);
      };
      container.appendChild(button);

      // Fetch and display chain logos
      const logo = document.createElement('img');
      const normalizedName = normalizeChainName(chain);
      logo.src = `https://github.com/heyJonBray/chain-logos/blob/master/${normalizedName}Logo.png?raw=true`;
      logo.alt = `${chain} Logo`;
      logo.style.width = '100px'; // Set logo size
      container.appendChild(logo);
    }

    // Navigation button if there are more chains to display
    if (endIndex < chains.length) {
      const nextButton = document.createElement('button');
      nextButton.textContent = 'Next';
      nextButton.onclick = function () {
        navigateChains();
      };
      container.appendChild(nextButton);
    }
  }
}

function navigateChains() {
  currentStartIndex += 3; // Move to next set of chains
  displayChains(); // Refresh chain display
}

function selectChain(chain) {
  sessionStorage.setItem('chain', chain);
  console.log(`Chain selected: ${chain}`);
  document.getElementById('continueButton').style.display = 'block';
}

function goToContractPage() {
  if (!sessionStorage.getItem('chain')) {
    alert('Please select a blockchain first!');
    return;
  }
  window.location.href = 'contract.html';
}
