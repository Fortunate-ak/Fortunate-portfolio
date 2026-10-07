<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    public function index(): JsonResponse
    {
        $projects = Project::where('is_featured', true)
            ->orderBy('display_order', 'asc')
            ->orderBy('id', 'desc')
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'num' => $project->num ?? sprintf('%02d', $project->id),
                    'name' => $project->name,
                    'desc' => $project->desc,
                    'category' => $project->category ?? 'Full-Stack',
                    'tags' => $project->tags ?? [],
                    'stars' => (string) ($project->stars ?? '0'),
                    'href' => $project->href,
                    'live' => $project->live,
                    'image' => $project->image ? asset('storage/' . $project->image) : null,
                    'color' => $project->color ?? '#06b6d4',
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $projects,
        ]);
    }
}
