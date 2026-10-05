import matplotlib.pyplot as plt
import numpy as np

# ==========================================================
# GRAPH 1: Total Computational Steps (Operations) vs. Vertices
# ==========================================================
vertices = [50, 100, 150, 200, 300]
# Floyd-Warshall scales cubically O(V^3), Repeated Dijkstra scales O(V * E log V)
fw_ops = [500000, 4000000, 13511027, 32000000, 108000000]
dijkstra_ops = [15000, 32000, 56175, 85000, 150000]

plt.figure(figsize=(10, 5))
plt.plot(vertices, fw_ops, marker='o', linestyle='-', color='darkorange', linewidth=2, label='Floyd-Warshall ($O(V^3)$)')
plt.plot(vertices, dijkstra_ops, marker='s', linestyle='--', color='forestgreen', linewidth=2, label='Repeated Dijkstra ($O(V \\cdot E \\log V)$)')

plt.title('Floyd-Warshall vs. Repeated Dijkstra: Computational Operations vs. Vertex Count (V)', fontsize=12, fontweight='bold')
plt.xlabel('Number of Vertices (V)', fontsize=10)
plt.ylabel('Total Operational Steps', fontsize=10)
plt.yscale('log') # Using logarithmic scale because FW operations grow cubically and dwarf Dijkstra
plt.legend(fontsize=10)
plt.grid(True, linestyle='--', alpha=0.6)
plt.tight_layout()

# Save the first figure
plt.savefig('floyd_vs_dijkstra_operations.png', dpi=300)
plt.show()

# ========================================================
# GRAPH 2: Execution Time Profile Across Graph Densities
# ========================================================
graph_types = ['Sparse (E=2V)', 'Moderate (E=5V)', 'Dense (E=V^2/4)', 'Complete (E=V(V-1)/2)']
# FW is independent of edge count (strictly V^3), whereas Dijkstra thrives on sparsity
fw_time = [12.0, 12.5, 13.0, 13.5]       # Execution times in milliseconds (largely stable based on V)
dijkstra_time = [2.1, 8.5, 45.0, 115.0]  # Scales heavily as edges increase

x = np.arange(len(graph_types))
width = 0.35

plt.figure(figsize=(10, 5))
plt.bar(x - width/2, fw_time, width, label='Floyd-Warshall', color='darkorange', alpha=0.85)
plt.bar(x + width/2, dijkstra_time, width, label='Repeated Dijkstra', color='forestgreen', alpha=0.85)

plt.title('Floyd-Warshall vs. Repeated Dijkstra: Execution Time Across Graph Densities', fontsize=12, fontweight='bold')
plt.xlabel('Graph Density Type', fontsize=10)
plt.ylabel('Execution Time (ms)', fontsize=10)
plt.xticks(x, graph_types, fontsize=9)
plt.legend(fontsize=10)
plt.grid(axis='y', linestyle='--', alpha=0.6)
plt.tight_layout()

# Save the second figure
plt.savefig('floyd_vs_dijkstra_time_profile.png', dpi=300)
plt.show()