<?php
declare(strict_types=1);

namespace App\Repositories\Contracts;

interface SettingRepositoryInterface
{
    public function endRoom($attributes);

    public function sendMail($attributes);

    public function inviteRoom($attributes);
}
