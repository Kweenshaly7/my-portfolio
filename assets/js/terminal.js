/**
 * Interactive DevOps Cloud Terminal Emulator
 * For Mary-Queen Uchechukwu's Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  const terminalBody = document.getElementById('terminalBody');
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const chipButtons = document.querySelectorAll('.chip-btn');

  if (!terminalInput || !terminalOutput) return;

  const commands = {
    help: () => `
<span class="neon-text">Available Commands:</span>
  <span class="mono neon-text">help</span>                  - Show this help menu
  <span class="mono neon-text">cat architecture.tf</span>  - View AWS 3-Tier Terraform code sample
  <span class="mono neon-text">vpcctl --demo</span>        - Run local VPC Network Namespace simulator
  <span class="mono neon-text">status</span>                - Check live infrastructure status & uptime
  <span class="mono neon-text">skills</span>                - Display cloud, DevOps & operations stack
  <span class="mono neon-text">projects</span>              - List highlighted production repositories
  <span class="mono neon-text">whoami</span>                - Profile summary of Mary-Queen Uchechukwu
  <span class="mono neon-text">book</span>                  - Open Google Appointment Booking schedule
  <span class="mono neon-text">contact</span>               - Display direct communication channels
  <span class="mono neon-text">clear</span>                 - Clear the terminal screen
`,

    'cat architecture.tf': () => `
<span class="text-secondary">// AWS 3-Tier Multi-AZ Infrastructure Module (Terraform)</span>
<span class="neon-text">module</span> "vpc" {
  source  = "./module-vpc"
  cidr    = "10.0.0.0/16"
  azs     = ["us-east-1a", "us-east-1b"]
  enable_nat_gateway = true
}

<span class="neon-text">module</span> "eks_cluster" {
  source          = "./module-eks"
  cluster_name    = "mq-production-eks"
  vpc_id          = module.vpc.vpc_id
  subnets         = module.vpc.private_subnets
  node_groups     = { default = { desired = 3, max = 10, min = 2 } }
}

<span class="neon-text">module</span> "rds_postgres" {
  source          = "./module-database"
  engine          = "postgres"
  multi_az        = true
  storage_type    = "gp3"
}
<span class="text-secondary"># Verified via GitHub Actions CI/CD & ArgoCD GitOps</span>
`,

    'vpcctl --demo': () => `
<span class="neon-text">[VPCCTL SIMULATOR]</span> Initializing Linux Network Primitives...
[1/4] sudo ip netns add vpc-prod-ns (isolated network namespace) ... <span class="neon-text">OK</span>
[2/4] sudo ip link add veth-pub type veth peer name veth-br ... <span class="neon-text">OK</span>
[3/4] sudo iptables -t nat -A POSTROUTING -s 10.10.0.0/16 -j MASQUERADE ... <span class="neon-text">OK</span>
[4/4] Provisioning VPC Peering link & DNS resolver ... <span class="neon-text">OK</span>

<span class="neon-text">✓ VPC 'test-prod' simulated successfully! CIDR: 10.10.0.0/16 | Status: ACTIVE</span>
<span class="text-secondary">Source: github.com/Kweenshaly7/cloud-vpc-simulator</span>
`,

    status: () => `
<span class="neon-text">SYSTEM HEALTH METRICS:</span>
  Uptime Target:          <span class="neon-text">99.9%</span> High Availability
  Active Cloud Regions:   AWS (us-east-1, eu-central-1)
  Container Platform:     Amazon EKS / Docker Compose
  Automation:             GitHub Actions CI/CD Active
  Operations Scaled:      50,000+ members managed with 0 defects
  Cluster Status:         <span class="neon-text">HEALTHY (All nodes reporting)</span>
`,

    skills: () => `
<span class="neon-text">TECHNICAL & OPERATIONAL TOOLCHAIN:</span>
  • <span class="neon-text">Cloud & IaC:</span>       AWS (EC2, VPC, EKS, RDS, S3, IAM, Route 53), Terraform
  • <span class="neon-text">DevOps & CI/CD:</span>    Docker, Kubernetes, GitHub Actions, ArgoCD, Prometheus
  • <span class="neon-text">Linux & Networks:</span>   Ubuntu, Network Namespaces, iptables, HAProxy, Nginx
  • <span class="neon-text">Languages:</span>          Python, C, Bash/Shell, SQL, JavaScript, HTML5/CSS3
  • <span class="neon-text">Leadership:</span>         Head of Ops @ Afriment, COO @ Nykon, Founder @ ProLaunch
`,

    projects: () => `
<span class="neon-text">FLAGSHIP TECHNICAL REPOSITORIES & COLLABORATIONS:</span>
  1. <span class="neon-text">promohub-scalable-web-platform</span>   [PromoHub-Org] Cloud High Availability & Auto-scale
  2. <span class="neon-text">aws-three-tier-terraform-deploy</span>  [Personal] Terraform EKS, RDS Multi-AZ & ArgoCD
  3. <span class="neon-text">cloud-vpc-simulator</span>              [Personal] Python Linux Namespaces & iptables NAT
  4. <span class="neon-text">prolaunch-cv-optimizer</span>           [Personal] Full-Stack AI ATS CV Optimizer Platform
  5. <span class="neon-text">docker-linux-lab</span>                 [Personal] Container Orchestration & Daemon Monitor
  6. <span class="neon-text">alx-system_engineering-devops</span>    [Personal] HAProxy Load Balancing & SSL Automation
  7. <span class="neon-text">ptech-web</span>                       [ProLaunch-Group] Cloud Infrastructure & Services Portal
  8. <span class="neon-text">pacad-landing</span>                   [ProLaunch-Group] Interactive EdTech Curriculum Platform
  9. <span class="neon-text">pcareers-landing-page</span>           [ProLaunch-Group] Digital Career Acceleration Pipeline
 10. <span class="neon-text">pgroup-website</span>                 [ProLaunch-Group] Central Unified Organization Portal
<span class="text-secondary">Run 'cat architecture.tf', 'vpcctl --demo', or inspect code cards below.</span>
`,

    whoami: () => `
<span class="neon-text">Mary-Queen Uchechukwu (Coach MQ)</span>
Role:       Cloud Operations Engineer & Business Operations Leader
Mission:    Bridging user experience, cloud infrastructure, and operational scale.
Impact:     Scaled community from 0 to 50k+; generated ₦5M+ ARR; engineered 99.9% uptime architectures.
Founder:    ProLaunch Group (Technologies, Careers, Academy)
Author:     "The Silent Career Killers Nobody Talks About"
`,

    book: () => {
      setTimeout(() => {
        const modal = document.getElementById('bookingModal');
        if (modal) modal.classList.add('active');
      }, 300);
      return `<span class="neon-text">Opening Google Appointment Booking schedule modal...</span>`;
    },

    contact: () => `
<span class="neon-text">CONTACT & ENGAGEMENT CHANNELS:</span>
  • Email:      <span class="neon-text">maryqueen.cloud@gmail.com</span> | <span class="neon-text">maryqueen@prolaunchgroup.org</span>
  • LinkedIn:   <a href="https://www.linkedin.com/in/coach-mq" target="_blank" class="neon-text">linkedin.com/in/coach-mq</a>
  • GitHub:     <a href="https://github.com/Kweenshaly7" target="_blank" class="neon-text">github.com/Kweenshaly7</a>
  • X/Twitter:  <a href="https://x.com/kweenshaly" target="_blank" class="neon-text">x.com/kweenshaly</a>
  • Phone:      +234 901 798 3507 (Remote / Global)
`,

    clear: () => {
      terminalOutput.innerHTML = '';
      return '';
    }
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    
    // Add command echo
    const promptEcho = document.createElement('div');
    promptEcho.innerHTML = `<span class="prompt-symbol">mq@cloud-ops:~$</span> <span class="text-primary">${escapeHtml(rawCmd)}</span>`;
    terminalOutput.appendChild(promptEcho);

    if (cmd === '') return;

    if (cmd === 'clear') {
      commands.clear();
      return;
    }

    let response = '';
    if (commands[cmd]) {
      response = typeof commands[cmd] === 'function' ? commands[cmd]() : commands[cmd];
    } else if (cmd.startsWith('cat ')) {
      const file = cmd.replace('cat ', '').trim();
      if (file.includes('arch') || file.includes('.tf')) {
        response = commands['cat architecture.tf']();
      } else if (file.includes('resume') || file.includes('bio')) {
        response = commands.whoami();
      } else {
        response = `<span class="text-secondary">cat: ${file}: No such file. Try 'cat architecture.tf' or 'help'.</span>`;
      }
    } else {
      response = `<span class="text-secondary">command not found: "${escapeHtml(rawCmd)}". Type <span class="neon-text">help</span> to see available commands.</span>`;
    }

    if (response) {
      const resElem = document.createElement('div');
      resElem.className = 'terminal-output-block';
      resElem.innerHTML = response;
      terminalOutput.appendChild(resElem);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      executeCommand(val);
    }
  });

  chipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        terminalInput.value = '';
        executeCommand(cmd);
      }
    });
  });

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
});
