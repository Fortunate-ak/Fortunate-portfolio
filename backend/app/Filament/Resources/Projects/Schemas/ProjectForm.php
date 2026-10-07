<?php

namespace App\Filament\Resources\Projects\Schemas;

use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ProjectForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('num')
                    ->label('Project Number / ID')
                    ->placeholder('01, 02, etc.'),

                TextInput::make('name')
                    ->label('Project Name')
                    ->required()
                    ->placeholder('E-Commerce Store'),

                TextInput::make('category')
                    ->required()
                    ->default('Full-Stack')
                    ->placeholder('Frontend, Backend, AI/ML, Full-Stack'),

                Textarea::make('desc')
                    ->label('Description')
                    ->required()
                    ->rows(3)
                    ->columnSpanFull(),

                TagsInput::make('tags')
                    ->label('Technologies / Tags')
                    ->placeholder('Add a tag (e.g. React, Node.js)')
                    ->columnSpanFull(),

                TextInput::make('stars')
                    ->label('Stars Count')
                    ->default('0'),

                TextInput::make('href')
                    ->label('GitHub URL')
                    ->placeholder('https://github.com/...'),

                TextInput::make('live')
                    ->label('Live Demo URL')
                    ->placeholder('https://...'),

                FileUpload::make('image')
                    ->label('Project Image / Thumbnail')
                    ->directory('projects')
                    ->image()
                    ->columnSpanFull(),

                ColorPicker::make('color')
                    ->label('Accent Color')
                    ->default('#06b6d4'),

                Toggle::make('is_featured')
                    ->label('Featured Project')
                    ->default(true),

                TextInput::make('display_order')
                    ->label('Display Order')
                    ->required()
                    ->numeric()
                    ->default(0),
            ]);
    }
}
