<template>
  <div class="learn-lamp min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
        ← Back to Topics
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🐧</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">LAMP Stack & Backend</h1>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Linux, Apache, MySQL, PHP. The classic stack that powers 70% of the web. Essential backend knowledge for senior frontend developers.
      </p>
    </div>

    <!-- Layout: Nav + Content -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-orange-500"
        @select="setSection"
        class="lg:w-56 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-5">
        <!-- ==================== LINUX ==================== -->
        <template v-if="activeSection === 'linux'">
          <ConceptCard
            id="linux-basics"
            icon="🐚"
            title="Linux Shell & File System"
            subtitle="The OS that runs the server"
            definition="Linux is a Unix-like OS. The shell (Bash/Zsh) is how you interact with it. File system starts at root (/). Key directories: /var/www (web files), /etc (config), /var/log (logs)."
            analogy="Linux is the building foundation. The shell is the control room. If you can't navigate the building, you can't fix the plumbing."
            seniorTip="Frontend devs often need to debug on the server. Know how to tail logs (tail -f), check disk space (df -h), and find files (find . -name). Don't fear the terminal."
            defaultOpen
          >
            <CodePlayground
              title="linux-commands.sh"
              :initialCode="codes.linux"
              language="bash"
            />
          </ConceptCard>

          <ConceptCard
            id="permissions"
            icon="🔒"
            title="Permissions & Ownership"
            subtitle="chmod 755 vs 644"
            definition="Every file has an owner, group, and permissions (Read, Write, Execute). r=4, w=2, x=1. 755 (rwx, rx, rx) for directories/scripts. 644 (rw, r, r) for files. chown changes owner."
            analogy="Permissions are like keycards. 7 (rwx) is the master key. 5 (rx) lets you look but not touch. 4 (r) lets you read only. Wrong permissions = 403 Forbidden or 500 Server Error."
          >
            <CodePlayground
              title="permissions.sh"
              :initialCode="codes.permissions"
              language="bash"
            />
          </ConceptCard>
        </template>

        <!-- ==================== APACHE ==================== -->
        <template v-if="activeSection === 'apache'">
          <ConceptCard
            id="htaccess"
            icon="⚙️"
            title=".htaccess & Configuration"
            subtitle="Per-directory server config"
            definition=".htaccess files allow you to override global server settings for a specific directory. Used for redirects, rewriting URLs, enabling compression, and access control."
            analogy=".htaccess is like a rule sheet posted on a specific office door. It overrides the building's general rules (httpd.conf) for just that room."
            seniorTip="Misconfigured .htaccess is a common cause of 500 errors. Test changes carefully. Use RewriteBase correctly. Prefer main config (httpd.conf) for performance if you have root access."
            defaultOpen
          >
            <CodePlayground
              title=".htaccess"
              :initialCode="codes.htaccess"
              language="apache"
            />
          </ConceptCard>

          <ConceptCard
            id="caching-compression"
            icon="🚀"
            title="Caching & Compression"
            subtitle="Speed up the frontend from the backend"
            definition="Apache modules like mod_expires and mod_deflate handle caching and compression. Expires headers tell browsers how long to cache files. Gzip/Brotli compresses files before sending."
            analogy="Compression is like zipping a suitcase before flying. Caching headers are like 'Best Before' dates — the browser knows if it can eat the food (file) from the fridge (cache) or needs to buy new."
          >
            <CodePlayground
              title="caching.conf"
              :initialCode="codes.caching"
              language="apache"
            />
          </ConceptCard>
        </template>

        <!-- ==================== MYSQL ==================== -->
        <template v-if="activeSection === 'mysql'">
          <ConceptCard
            id="sql-basics"
            icon="🗄️"
            title="Relational Data & SQL"
            subtitle="Structured Query Language"
            definition="MySQL is a relational database. Data is stored in tables (rows/cols) with defined schemas. SQL is used to CRUD (Create, Read, Update, Delete) data. Relationships are formed via keys (Primary/Foreign)."
            analogy="MySQL is like a warehouse of Excel sheets that are linked together. SQL is the language you shout to the warehouse manager to get specific data."
          >
            <CodePlayground
              title="queries.sql"
              :initialCode="codes.sql"
              language="sql"
            />
          </ConceptCard>

          <ConceptCard
            id="optimization"
            icon="⚡"
            title="Indexes & Performance"
            subtitle="Why is the query slow?"
            definition="Indexes (B-Tree) are data structures that speed up data retrieval. Without an index, MySQL does a 'Table Scan' (reads every row). EXPLAIN shows how a query is executed."
            analogy="An index is like the index at the back of a book. Without it, you have to read every page to find 'Harry Potter'. With it, you jump straight to page 394."
            seniorTip="Always index columns used in WHERE, JOIN, and ORDER BY. But don't index everything (slows down writes). Use EXPLAIN to debug slow queries."
          >
            <CodePlayground
              title="indexing.sql"
              :initialCode="codes.optimization"
              language="sql"
            />
          </ConceptCard>
        </template>

        <!-- ==================== PHP ==================== -->
        <template v-if="activeSection === 'php'">
          <ConceptCard
            id="php-basics"
            icon="🐘"
            title="PHP: Hypertext Preprocessor"
            subtitle="Server-Side Rendering (SSR)"
            definition="PHP runs on the server. It processes code between <?php ?> tags and outputs pure HTML to the browser. It handles form submissions, database connections, and session management."
            analogy="PHP is the chef in the kitchen. The browser orders a meal (request). PHP chops, cooks, and plates it (executes code). The waiter brings the finished dish (HTML) to the table."
            seniorTip="Modern PHP (8.x) is fast and typed. It powers Laravel, Symfony, and WordPress. Understanding PHP helps you debug API responses and legacy CMS themes."
          >
            <CodePlayground
              title="basics.php"
              :initialCode="codes.php"
              language="php"
            />
          </ConceptCard>

          <ConceptCard
            id="api-endpoint"
            icon="🔌"
            title="Building an API Endpoint"
            subtitle="JSON for your frontend"
            definition="Frontend apps (React/Vue) often consume JSON APIs. PHP can output JSON instead of HTML by setting the Content-Type header. This separates the backend logic from the frontend view."
            analogy="Instead of serving a plated meal (HTML), the kitchen packs the ingredients into a bento box (JSON) effectively delivering raw data for you to assemble."
          >
            <CodePlayground
              title="api.php"
              :initialCode="codes.api"
              language="php"
            />
          </ConceptCard>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import SectionNav from './SectionNav.vue'
import ConceptCard from './ConceptCard.vue'
import CodePlayground from './CodePlayground.vue'

// ==================== Section Navigation ====================
const sections = [
  { id: 'linux', label: 'Linux', icon: '🐧', badge: '2' },
  { id: 'apache', label: 'Apache', icon: '⚙️', badge: '2' },
  { id: 'mysql', label: 'MySQL', icon: '🗄️', badge: '2' },
  { id: 'php', label: 'PHP', icon: '🐘', badge: '2' },
]

const activeSection = ref('linux')

function setSection(id) {
  activeSection.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ==================== Code Examples ====================
const codes = {
  linux: `# Common Linux Commands for Web Devs

# 1. File Navigation
ls -la          # List all files (including hidden) with details
cd /var/www     # Change directory to web root
pwd             # Print working directory

# 2. File Operations
touch index.php # Create empty file
mkdir assets    # Make directory
cp style.css style.bak  # Copy file
rm -rf temp/    # Remove directory (careful!)

# 3. Viewing Content
cat config.php  # Print file content
less error.log  # View large file with scrolling
tail -f access.log # Watch log file in REAL TIME (crucial!)

# 4. Search
grep -r "TODO" . # Recursive search for "TODO" in current dir
find . -name "*.conf" # Find files ending in .conf

# 5. System Status
top             # Show running processes (CPU/RAM)
df -h           # Check disk space usage`,

  permissions: `# Permissions Explained

# r = read (4), w = write (2), x = execute (1)
# Owner | Group | Public

# Common Permissions:
# 644 (rw-r--r--) -> Standard files (HTML, PHP, img)
# 755 (rwxr-xr-x) -> Directories & Scripts

# Changing Permissions (chmod)
chmod 755 image_uploads/
chmod 644 index.html
chmod -R 755 assets/  # Recursive

# Changing Ownership (chown)
# user:group
chown -R www-data:www-data /var/www/html

# ⚠️ DANGER ZONE
# chmod 777 (rwxrwxrwx) -> Everyone can write!
# NEVER do this in production. It's a security hole.`,

  htaccess: `# .htaccess Configuration

# 1. Enable Rewrite Engine
RewriteEngine On
RewriteBase /

# 2. Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# 3. Remove .php extension (clean URLs)
# example.com/about.php -> example.com/about
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.php -f
RewriteRule ^(.*)$ $1.php [L]

# 4. SPA Fallback (for React/Vue/Astro)
# If file doesn't exist, serve index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# 5. Prevent Directory Listing
Options -Indexes`,

  caching: `# Browser Caching & Compression

# 1. Enable GZIP Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json
</IfModule>

# 2. Browser Caching (Expires Headers)
<IfModule mod_expires.c>
  ExpiresActive On
  
  # Images: cache for 1 year (they rarely change)
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  
  # CSS/JS: cache for 1 month
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  
  # HTML: don't cache (or very short)
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

# 3. Cache-Control Header
<FilesMatch "\\.(ico|pdf|flv|jpg|jpeg|png|gif|js|css|swf)$">
  Header set Cache-Control "max-age=2592000, public"
</FilesMatch>`,

  sql: `-- SQL Basics

-- 1. Create Table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(100),
  crated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Insert Data
INSERT INTO users (email, name) VALUES 
('john@example.com', 'John Doe'),
('jane@test.com', 'Jane Smith');

-- 3. Select Data
SELECT * FROM users WHERE id = 1;

-- 4. Join Tables (The power of Relational DBs)
-- Assume we have an 'orders' table with user_id
SELECT users.name, orders.total
FROM users
JOIN orders ON users.id = orders.user_id
WHERE orders.status = 'completed';

-- 5. Update
UPDATE users SET name = 'Johnathan' WHERE id = 1;

-- 6. Delete
DELETE FROM users WHERE id = 1;`,

  optimization: `-- Indexing & Performance

-- 👎 SLOW: Table Scan
-- MySQL has to look at every single row to find matches
SELECT * FROM products WHERE category = 'electronics';

-- 👍 FAST: B-Tree Index
-- Create an index on the 'category' column
CREATE INDEX idx_category ON products(category);

-- Now MySQL jumps directly to 'electronics' in the tree
-- Time complexity: O(log N) vs O(N)

-- 🕵️ EXPLAIN Command
-- Put 'EXPLAIN' before any query to see how MySQL executes it
EXPLAIN SELECT * FROM products WHERE category = 'electronics';
-- Look for 'type: ref' (good) vs 'type: ALL' (bad - full scan)

-- ⚠️ Tradeoffs
-- Indexes make READS fast but WRITES slower 
-- (because the index must be updated on INSERT/UPDATE).
-- Only index columns you frequently search/filter by.`,

  php: `<?php
// PHP Basics for Frontend Devs

// 1. Variables start with $
$name = "Mayuresh";
$role = "Frontend Developer";

// 2. Arrays (Associative = Objects in JS)
$user = [
    "id" => 101,
    "skills" => ["Vue", "React", "PHP"]
];

// 3. Conditionals
if ($user["id"] > 100) {
    // 4. Output HTML
    echo "<h1>Welcome back, " . $name . "!</h1>";
}

// 5. Loops
echo "<ul>";
foreach ($user["skills"] as $skill) {
    echo "<li>" . $skill . "</li>";
}
echo "</ul>";

// 6. Superglobals (Accessing Input)
// URL: example.com?page=2
$page = $_GET["page"] ?? 1; // Null coalescing operator

?>`,

  api: `<?php
// Simple JSON API Endpoint

// 1. Set Header to JSON
header('Content-Type: application/json');

// 2. Allow CORS (if frontend is on different port)
header('Access-Control-Allow-Origin: *');

// 3. Simulating Database Fetch
$products = [
    ["id" => 1, "name" => "Laptop", "price" => 999],
    ["id" => 2, "name" => "Mouse", "price" => 29],
    ["id" => 3, "name" => "Keyboard", "price" => 89]
];

// 4. Handle Request Methods
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // 5. Output JSON
    echo json_encode([
        "status" => "success",
        "data" => $products
    ]);
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["status" => "error", "message" => "Only GET allowed"]);
}
?>`
}
</script>
